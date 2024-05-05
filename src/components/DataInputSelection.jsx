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

export default function DataInputSelection() {
  const [days, setDays] = useState([]);
  const [csvData, setCSVData] = useState([]);

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
            aria-label="Basic button group"
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
        {days.map((x, index) => barCharts(index))}
      </Container>
    </Box>
  );
}
