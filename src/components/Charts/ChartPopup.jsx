import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress

export default function ChartPopup({
  open,
  data,
  handleClose,
  handleChartCreate,
}) {
  const [xAxis, setXAxis] = useState('');
  const [yAxis1, setYAxis1] = useState('');
  const [yAxis2, setYAxis2] = useState('');
  const [showSecondYAxis, setShowSecondYAxis] = useState(false);
  const [loading, setLoading] = useState(false);

  const _processHeaderName = (columnName) => {
    const words = columnName
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    return words.join(' ');
  };

  const columns =
    data.length > 0
      ? data[0].map((column, index) => ({
          field: `${index}`, //TODO: Change to column number with integer
          headerName: _processHeaderName(column),
          flex: 1,
        }))
      : [];
  const rows = data.slice(1).map((row, rowIndex) => {
    const rowData = {};
    row.forEach((cell, cellIndex) => {
      rowData[`${cellIndex}`] = cell;
    });
    return { id: rowIndex, ...rowData };
  });

  const onChartCreate = async () => {
    if (xAxis && yAxis1) {
      const selectedYAxes = [yAxis1];
      if (showSecondYAxis && yAxis2) {
        selectedYAxes.push(yAxis2);
      }
      setLoading(true);
      await handleChartCreate(xAxis, selectedYAxes);
      setLoading(false);
    } else {
      alert('Please select both X-axis and Y-axis.');
    }
  };

  const handleYAxisChange = (e, setYAxis) => {
    const value = e.target.value;
    setYAxis(value);
    if (value && columns.length > 2) {
      setShowSecondYAxis(true);
    } else {
      setShowSecondYAxis(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => handleClose(-1)}
      PaperProps={{ sx: { backgroundColor: 'rgba(0, 0, 0, 1)' } }}
    >
      <DialogTitle>Select Data Columns for Chart</DialogTitle>
      <DialogContent>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}
        >
          <FormControl variant="outlined" style={{ minWidth: 120 }}>
            <Select
              value={xAxis}
              onChange={(e) => setXAxis(e.target.value)}
              displayEmpty
              inputProps={{ 'aria-label': 'Select X-axis' }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: 'rgba(0, 0, 0, 1)', // Adjust transparency here
                  },
                },
              }}
            >
              <MenuItem value="" disabled>
                Select X-axis
              </MenuItem>
              {columns.map((column) => (
                <MenuItem key={column.field} value={column.field}>
                  {column.headerName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" style={{ minWidth: 120 }}>
            <Select
              value={yAxis1}
              onChange={(e) => handleYAxisChange(e, setYAxis1)}
              displayEmpty
              inputProps={{ 'aria-label': 'Select Y-axis' }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: 'rgba(0, 0, 0, 1)', // Adjust transparency here
                  },
                },
              }}
            >
              <MenuItem value="" disabled>
                Select Y-axis
              </MenuItem>
              {columns.map((column) => (
                <MenuItem key={column.field} value={column.field}>
                  {column.headerName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {showSecondYAxis && (
            <FormControl variant="outlined" style={{ minWidth: 120 }}>
              <Select
                value={yAxis2}
                onChange={(e) => handleYAxisChange(e, setYAxis2)}
                displayEmpty
                inputProps={{ 'aria-label': 'Select Y-axis' }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: 'rgba(0, 0, 0, 1)', // Adjust transparency here
                    },
                  },
                }}
              >
                <MenuItem value="" disabled>
                  Select Other Value (Optional)
                </MenuItem>
                {columns.map((column) => (
                  <MenuItem key={column.field} value={column.field}>
                    {column.headerName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </div>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            disableColumnSelector
            disableDensitySelector
            disableRowSelectionOnClick
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(-1)}>Cancel</Button>
        <Button onClick={() => onChartCreate()}>
          {loading ? <CircularProgress /> : 'Create Chart'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
