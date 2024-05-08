import React from 'react';

import Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';
import HighchartsBoost from 'highcharts/modules/boost';

HighchartsBoost(Highcharts);
HC_exporting(Highcharts);

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
