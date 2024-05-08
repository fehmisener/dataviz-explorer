import React from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsBoost from 'highcharts/modules/boost';
HighchartsBoost(Highcharts);

export default function ScatterChart({ chartName, data, xAxis }) {
  const optionsHighChart = {
    boost: {
      enabled: true,
      seriesThreshold: 2,
      debug: {
        timeRendering: true,
      },
    },
    chart: {
      type: 'scatter',
      zooming: {
        type: 'xy',
      },
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
