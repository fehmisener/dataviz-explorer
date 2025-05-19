import React from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Module imports have been temporarily removed to troubleshoot an issue with chart rendering.
// The issue involves potential conflicts between Highcharts modules and the current configuration.
// Once the issue is resolved, the necessary modules will be reintroduced to enhance functionality.

export default function ScatterChart({ chartName, data, xAxis }) {
  const optionsHighChart = {
    boost: {
      enabled: true,
      seriesThreshold: 1,
      debug: {
        timeRendering: true,
      },
    },
    exporting: {
      enabled: true,
    },
    chart: {
      animation: false,
      type: 'scatter',
      zooming: {
        type: 'xy',
        mouseWheel: true,
      },
      panning: {
        enabled: true,
        type: 'xy',
      },
      panKey: 'shift',
    },
    legend: {
      align: 'center',
      verticalAlign: 'top',
    },
    title: {
      text: 'Scatter Chart',
    },
    xAxis: {
      title: {
        text: xAxis,
      },
    },
    yAxis: {
      title: {
        text: 'Value',
      },
    },
    series: data.datasets.map((dataset) => ({
      name: dataset.label,
      data: dataset.data,
    })),
  };

  return (
    <HighchartsReact
      id={chartName}
      highcharts={Highcharts}
      options={optionsHighChart}
    />
  );
}
