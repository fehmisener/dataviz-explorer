import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Colors,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

export default function ScatterChart({ chartName, data, xAxis }) {
  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: xAxis,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value',
        },
      },
    },
    plugins: {
      colors: {
        enaforceOverride: true,
      },
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Scatter Chart',
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy',
        },
        zoom: {
          wheel: {
            enabled: true,
            modifierKey: 'ctrl',
          },
        },
      },
    },
  };
  return <Scatter id={chartName} options={options} data={data} height={110} />;
}
