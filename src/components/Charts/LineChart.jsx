import React from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Module imports (e.g., Highcharts modules for exporting, accessibility, etc.) were removed temporarily
// to troubleshoot an issue with chart rendering. Once the issue is resolved, these modules should be
// reintroduced to restore full functionality. Ensure to test thoroughly after re-adding the modules.

export default function LineChart({ chartName, data, xAxis }) {
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
      type: 'line',
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
      text: 'Line Chart',
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
