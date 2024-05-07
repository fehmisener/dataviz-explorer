import React from 'react';
import download from 'downloadjs';

import { Chart } from 'chart.js';
import LineChart from './LineChart';
import ScatterChart from './ScatterChart';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { alpha } from '@mui/material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import ScatterPlotOutlinedIcon from '@mui/icons-material/ScatterPlotOutlined';
import ZoomOutMapOutlinedIcon from '@mui/icons-material/ZoomOutMapOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

export default function ChartBox({
  index,
  chartData,
  onChartTypeChange,
  onRemoveChart,
}) {
  const [loading, setLoading] = React.useState(false);

  function _resetChartZoom(chartId) {
    const chart = Chart.getChart(`chart-${chartId}`);
    chart.resetZoom();
  }

  function _downloadChart(chartId) {
    setLoading(true);

    const chart = Chart.getChart(`chart-${chartId}`);

    download(chart.toBase64Image(), 'chart.png', 'image/png');
    setLoading(false);
  }

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
        label: `Dataset ${i + 1}`,
        data: chartData.data.slice(1).map((row) => parseFloat(row[value])),
      };
    });

    const data = {
      labels,
      datasets,
    };

    if (chartData.type === 'line') {
      return <LineChart chartName={chartName} data={data} />;
    } else {
      return <ScatterChart chartName={chartName} data={data} />;
    }
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
                  startIcon={<ZoomOutMapOutlinedIcon />}
                  onClick={() => _resetChartZoom(index)}
                >
                  Reset Zoom
                </Button>
                <Button
                  startIcon={<ClearOutlinedIcon />}
                  onClick={() => onRemoveChart()}
                >
                  Remove Chart
                </Button>

                <LoadingButton
                  variant="outlined"
                  startIcon={<FileDownloadOutlinedIcon />}
                  onClick={() => _downloadChart(index)}
                  loading={loading}
                >
                  Download Chart
                </LoadingButton>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
