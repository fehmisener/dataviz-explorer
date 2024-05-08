import React, { useState } from 'react';

import LineChart from './LineChart';
import ScatterChart from './ScatterChart';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';

import { alpha } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import ScatterPlotOutlinedIcon from '@mui/icons-material/ScatterPlotOutlined';

import { processHeaderName } from '../../utils/data';

export default function ChartBox({
  index,
  chartData,
  onChartTypeChange,
  onRemoveChart,
}) {
  const [openInfo, setOpenInfo] = useState(false);

  const _handleChartTypeChange = (event, index, newType) => {
    if (newType !== null) {
      onChartTypeChange(newType);
    }
  };

  const _handleGenerateChart = (index) => {
    const chartName = `chart-${index}`;

    const labels = chartData.data.slice(1).map((row) => row[chartData.xAxis]);
    const datasets = chartData.values.map((value, i) => {
      return {
        label: `${processHeaderName(chartData.data[0][value])}`,
        data: chartData.data.slice(1).map((row) => parseFloat(row[value])),
      };
    });

    const data = {
      labels,
      datasets,
    };

    if (chartData.type === 'line') {
      return (
        <LineChart
          chartName={chartName}
          data={data}
          xAxis={processHeaderName(chartData.data[0][chartData.xAxis])}
        />
      );
    } else {
      return (
        <ScatterChart
          chartName={chartName}
          data={data}
          xAxis={processHeaderName(chartData.data[0][chartData.xAxis])}
        />
      );
    }
  };

  const handleInfoOpen = () => {
    setOpenInfo(true);
  };

  const handleInfoClose = () => {
    setOpenInfo(false);
  };

  return (
    <Box
      key={index}
      sx={(theme) => ({
        width: '100%',
        borderRadius: '10px',
        outline: '1px solid',
        outlineColor:
          theme.palette.mode === 'light'
            ? alpha('#BFCCD9', 0.5)
            : alpha('#9CCCFC', 0.2),
        boxShadow:
          theme.palette.mode === 'light'
            ? `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`
            : `0 0 24px 12px ${alpha('#033363', 0.3)}`,
      })}
    >
      <Paper
        sx={{
          p: 2,
          margin: 'auto',
          flexGrow: 1,
        }}
      >
        <Grid container spacing={2} direction="column" alignItems="stretch">
          <Grid item>{_handleGenerateChart(index)}</Grid>
          <Grid item container justifyContent="center" spacing={2}>
            <Grid item>
              <ToggleButtonGroup
                color="primary"
                value={chartData.type}
                exclusive
                onChange={(e) =>
                  _handleChartTypeChange(e, index, e.currentTarget.value)
                }
                sx={{
                  height: '100%',
                }}
              >
                <ToggleButton value="line">
                  <ShowChartOutlinedIcon />
                </ToggleButton>
                <ToggleButton value="scatter">
                  <ScatterPlotOutlinedIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item>
              <ButtonGroup
                variant="outlined"
                size="large"
                aria-label="chart-button-group"
                sx={{
                  height: '100%',
                }}
              >
                <Button
                  startIcon={<ClearOutlinedIcon />}
                  onClick={() => onRemoveChart()}
                >
                  Remove Chart
                </Button>
                <Button
                  startIcon={<InfoOutlinedIcon />}
                  onClick={handleInfoOpen}
                >
                  How to Use
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Dialog open={openInfo} onClose={handleInfoClose}>
        <DialogTitle>How to Use</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            - <strong>Zoom In/Out:</strong> Use the mouse wheel to zoom in or
            out on the chart. Or, with a mouse pointer, the zooming is performed
            by dragging out a rectangle in the chart. When zooming, a button
            appears that lets the user zoom out.
          </Typography>
          <Box mt={2} />
          <Typography variant="body1">
            - <strong>Pan:</strong> Click and drag on the chart while holding
            the Shift key to pan around and explore different areas.
          </Typography>
          <Box mt={2} />
          <Typography variant="body1">
            - <strong>Download Screenshot:</strong> Use the context button with
            a menu located in the top right corner of the chart to download the
            chart in various formats (PNG, JPEG, PDF, SVG).
          </Typography>
          <Box mt={2} />
          <Typography variant="body1">
            - <strong>Change Plot Type:</strong> You can change the plot type
            between line and scatter. Use the toggle buttons provided below the
            chart to switch between the plot types.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleInfoClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
