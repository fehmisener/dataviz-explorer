import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { BarChart } from '@mui/x-charts/BarChart';

import UploadFileIcon from '@mui/icons-material/UploadFile';
import DatasetOutlinedIcon from '@mui/icons-material/DatasetOutlined';
import AirIcon from '@mui/icons-material/Air';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ZoomOutMapOutlinedIcon from '@mui/icons-material/ZoomOutMapOutlined';

import LineChart from './Charts/LineChart';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import LoadingButton from '@mui/lab/LoadingButton';

import { Chart } from 'chart.js';

import download from 'downloadjs';
import { alpha } from '@mui/material';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import ScatterPlotOutlinedIcon from '@mui/icons-material/ScatterPlotOutlined';

export default function DataInputSelection() {
  const [days, setDays] = useState([]);
  const [csvData, setCSVData] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [alignment, setAlignment] = React.useState('line');

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  function handleClick() {
    setLoading(true);

    const chart = Chart.getChart('test');

    download(chart.toBase64Image(), 'chart.png', 'image/png');
    setLoading(false);
  }

  function resetChartZoom() {
    const chart = Chart.getChart('test');
    chart.resetZoom();
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        const id = Date.now();
        const data = parseCSV(content);
        setCSVData((prevData) => [...prevData, { id, data }]);
      };
      reader.readAsText(file);
    }
  };

  const parseCSV = (csvContent) => {
    const lines = csvContent.split(/\r\n|\n/);
    const data = [];
    lines.forEach((line) => {
      const delimiter = line.includes(',') ? ',' : ';';
      const values = line.split(delimiter);
      data.push(values);
    });
    return data;
  };

  const barCharts = (index) => {
    return (
      <BarChart
        series={[
          { data: [35, 44, 24, 34] },
          { data: [51, 6, 49, 30] },
          { data: [15, 25, 30, 50] },
          { data: [60, 50, 15, 25] },
        ]}
        height={290}
        xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />
    );
  };

  const addChart = () => {
    let res = [...days];
    res.push('');
    setDays(res);
  };

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
                type="file"
                accept=".csv"
                hidden
                onChange={handleFileUpload}
              />
            </Button>
            <Button
              onClick={() => {
                addChart();
              }}
            >
              <DatasetOutlinedIcon sx={{ fontSize: '20px', mr: 1 }} />
              Database Connection
            </Button>
            <Button
              onClick={() => {
                alert('clicked');
              }}
            >
              <AirIcon sx={{ fontSize: '20px', mr: 1 }} />
              Real-time Data Flow
            </Button>
          </ButtonGroup>
        </Box>

        <Box
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
              /*
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
              */
            }}
          >
            <Grid container spacing={2} direction="column" alignItems="stretch">
              <Grid item>
                <LineChart chartName="test" />
              </Grid>
              <Grid item container justifyContent="center" spacing={2}>
                <Grid item>
                  <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
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
                      onClick={resetChartZoom}
                    >
                      Reset Zoom
                    </Button>

                    <LoadingButton
                      variant="outlined"
                      startIcon={<FileDownloadOutlinedIcon />}
                      onClick={handleClick}
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

        {days.map((x, index) => barCharts(index))}
      </Container>
    </Box>
  );
}
