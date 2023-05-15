import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Chart = () => {
  const chartOptions = {
    chart: {
      type: 'line'
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: ['2016', '2017', '2018', '2019', '2020']
    },
    yAxis: {
      title: {
        text: ''
      }
    },
    series: [
      {
        name: '',
        data: [10000, 15000, 12000, 25000, 30000]
      }
    ],
    responsive: {
      rules: [
        {
          condition: {
            width: 300,
            height: 200
          }
        }
      ]
    }
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default Chart;
