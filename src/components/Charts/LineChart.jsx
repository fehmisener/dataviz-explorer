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
import { Line } from 'react-chartjs-2';
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

export default function LineChart({ chartName, data, xAxis }) {
  const options = {
    responsive: true,
    datasets: {
      line: {
        pointRadius: 0,
      },
    },
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
        forceOverride: true,
      },
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Line Chart`,
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
  return <Line id={chartName} options={options} data={data} height={110} />;
}
