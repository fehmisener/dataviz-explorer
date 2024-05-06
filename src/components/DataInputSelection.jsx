import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import UploadFileIcon from '@mui/icons-material/UploadFile';
import DatasetOutlinedIcon from '@mui/icons-material/DatasetOutlined';
import AirIcon from '@mui/icons-material/Air';

import ChartBox from './Charts/ChartBox';

import { readFileAsync, parseCSV } from '../utils/data.js';

export default function DataInputSelection() {
  const [charts, setCharts] = useState([]);

  const _handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const content = await readFileAsync(file);
      const data = parseCSV(content);

      setCharts((prevData) => [...prevData, { data, type: 'line' }]);
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
    setCharts((prevCharts) => prevCharts.filter((_, i) => i !== index));
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
      </Container>
    </Box>
  );
}
