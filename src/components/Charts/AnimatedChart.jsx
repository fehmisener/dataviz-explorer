import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { alpha } from '@mui/material';

ChartJS.register(LinearScale, PointElement, LineElement);

const AnimatedChart = () => {
  const [phase, setPhase] = useState(0);

  const generateSinData = (phase) => {
    const data = [];
    for (let i = 0; i <= 360; i++) {
      const radians = (i + phase) * (Math.PI / 180);
      data.push(Math.sin(radians));
    }
    return data;
  };

  const generateCosData = (phase) => {
    const data = [];
    for (let i = 0; i <= 360; i++) {
      const radians = (i + phase) * (Math.PI / 180);
      data.push(Math.cos(radians));
    }
    return data;
  };

  useEffect(() => {
    const animationFrameId = requestAnimationFrame(updatePhase);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const updatePhase = () => {
    setPhase((prevPhase) => prevPhase + 0.3);
    requestAnimationFrame(updatePhase);
  };

  return (
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
      <Line
        data={{
          labels: Array.from(Array(361).keys()),
          datasets: [
            {
              label: 'Sin Wave',
              borderColor: 'blue',
              data: generateSinData(phase),
              fill: false,
              tension: 0,
            },
            {
              label: 'Cos Wave',
              borderColor: 'red',
              data: generateCosData(phase),
              fill: false,
              tension: 0,
            },
          ],
        }}
        options={{
          animation: {
            duration: 0,
          },
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
              min: 0,
              max: 360,
            },
            y: {
              min: -1.5,
              max: 1.5,
            },
          },
        }}
        height={110}
      />
    </Box>
  );
};

export default AnimatedChart;
