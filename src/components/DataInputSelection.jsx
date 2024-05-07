import React, { useState, useMemo, useRef } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import UploadFileIcon from '@mui/icons-material/UploadFile';
import DatasetOutlinedIcon from '@mui/icons-material/DatasetOutlined';
import AirIcon from '@mui/icons-material/Air';

import ChartBox from './Charts/ChartBox';
import ChartPopup from './Charts/ChartPopup';

import { readFileAsync, parseCSV } from '../utils/data.js';

export default function DataInputSelection() {
  const fileInputRef = useRef(null);
  const [charts, setCharts] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const _handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const content = await readFileAsync(file);
      const data = parseCSV(content);

      setPopupOpen(true);
      setCharts((prevCharts) => [...prevCharts, { data, type: 'line' }]);
      setSelectedFile(file);
    }
  };

  const _handleChartTypeChange = (index, newType) => {
    setCharts((prevCharts) =>
      prevCharts.map((chart, i) =>
        i === index ? { ...chart, type: newType } : chart
      )
    );
  };

  const _handleRemoveChart = (index) => {
    fileInputRef.current.value = null;
    setCharts((prevCharts) => prevCharts.filter((_, i) => i !== index));
  };

  const _handleClosePopup = (status) => {
    setPopupOpen(false);
    if (status !== 1) {
      setCharts((prevCharts) => prevCharts.slice(0, -1));
    }
  };

  const handleChartCreate = (xAxis, selectedYAxes) => {
    setCharts((prevCharts) =>
      prevCharts.map((chart, i) =>
        i === charts.length - 1
          ? { ...chart, xAxis: xAxis, values: selectedYAxes }
          : chart
      )
    );
    _handleClosePopup(1);
  };

  const keyForPopup = useMemo(() => {
    return selectedFile ? selectedFile.name : 'default';
  }, [selectedFile]);

  return (
    <Box
      id="datainputselection"
      sx={{
        pt: { xs: 4, sm: 4 },
        pb: { xs: 8, sm: 4 },
        color: 'white',
        bgcolor: '#06090a',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 3 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4">
            Data Input Options
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            Select your preferred data input method for visualization from the
            options below.
          </Typography>
        </Box>
        <Box alignItems="center">
          <ButtonGroup
            variant="outlined"
            size="large"
            aria-label="data-input-options-button-group"
          >
            <Button component="label">
              <UploadFileIcon sx={{ fontSize: '20px', mr: 1 }} />
              Upload CSV
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                hidden
                onChange={_handleFileUpload}
              />
            </Button>
            <Button
              onClick={() => {
                alert('This feature is not available yet.');
              }}
            >
              <DatasetOutlinedIcon sx={{ fontSize: '20px', mr: 1 }} />
              Database Connection
            </Button>
            <Button
              onClick={() => {
                alert('This feature is not available yet.');
              }}
            >
              <AirIcon sx={{ fontSize: '20px', mr: 1 }} />
              Real-time Data Flow
            </Button>
          </ButtonGroup>
        </Box>
        {charts.length > 0 &&
          !popupOpen &&
          charts.map((x, index) => (
            <ChartBox
              key={index}
              index={index}
              chartData={charts[index]}
              onChartTypeChange={(newType) =>
                _handleChartTypeChange(index, newType)
              }
              onRemoveChart={() => _handleRemoveChart(index)}
            />
          ))}
        {charts.length > 0 && (
          <ChartPopup
            key={keyForPopup}
            open={popupOpen}
            data={charts[charts.length - 1]?.data}
            handleClose={(e) => _handleClosePopup(e)}
            handleChartCreate={(xAxis, selectedYAxes) =>
              handleChartCreate(xAxis, selectedYAxes)
            }
          />
        )}
      </Container>
    </Box>
  );
}
