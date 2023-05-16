import React from 'react';
import { twClassNames } from '@browserstack/utils';
import { format } from 'date-fns';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import PropTypes from 'prop-types';

function getFormattedTooltip() {
  const { x, y } = this.points[0];
  return `<span class="mr-8">${format(
    x,
    'dd, MMMM yyyy'
  )}</span><span>${y}</span>`;
}

const Chart = ({ pointStart, data }) => {
  const chartOptions = {
    chart: {
      type: 'line',
      style: {
        fontFamily: '"Inter", sans-serif'
      },
      height: 250
    },
    colors: ['#7E75EE'],
    title: {
      text: ''
    },
    xAxis: {
      type: 'datetime',
      gridLineWidth: 1,
      gridLineDashStyle: 'longdash',
      lineWidth: 1,
      lineColor: '#E5E5EF'
    },
    yAxis: {
      title: {
        text: ''
      },
      gridLineWidth: 1,
      gridLineDashStyle: 'longdash',
      lineWidth: 1,
      lineColor: '#E5E5EF'
    },
    series: [
      {
        name: '',
        data,
        pointStart,
        relativeXValue: true
      }
    ],
    credits: {
      enabled: false
    },
    tooltip: {
      shared: true,
      useHTML: true,
      backgroundColor: 'var(--colors-base-800)',
      borderColor: 'transparent',
      borderRadius: 8,
      className: 'flex',
      style: {
        color: '#fff',
        textTransform: 'capitalize',
        width: '250px',
        whiteSpace: 'normal',
        font: 2
      },
      shadow: false,
      padding: 12,
      formatter() {
        return getFormattedTooltip.call(this);
      }
    },
    legend: {
      enabled: false
    }
  };

  return (
    <div className={twClassNames('relative h-full overflow-hidden')}>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

Chart.propTypes = {
  pointStart: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    })
  ).isRequired
};

export default Chart;
