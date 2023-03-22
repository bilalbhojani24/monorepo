import React, { useMemo } from 'react';
import Chart from 'common/Chart';
import PropTypes from 'prop-types';

const CHART_OPTIONS = {
  title: {
    text: null
  },
  exporting: {
    enabled: false
  },
  credits: {
    enabled: false
  },
  legend: {
    enabled: false
  },
  tooltip: {
    enabled: false
  },
  xAxis: {
    enabled: false,
    showEmpty: false
  },
  yAxis: {
    enabled: false
  },
  plotOptions: {
    area: {
      lineWidth: 1
    },
    series: {
      connectNulls: true
    },
    column: {
      stacking: 'normal',
      cursor: 'pointer',
      maxPointWidth: 4
    }
  }
};

export default function MiniChart({ data, color, lineColor, chartType }) {
  const chartData = useMemo(
    () => ({
      ...CHART_OPTIONS,
      chart: {
        type: chartType,
        style: {
          fontFamily: '"Inter", sans-serif'
        },
        backgroundColor: 'transparent',
        plotBorderWidth: null,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        plotShadow: false,
        animation: false,
        borderWidth: 0,
        marginRight: 0
      },
      series: [
        {
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: false
              }
            }
          },
          name: '',
          animation: false,
          color,
          borderColor: color,
          lineColor,
          data
        }
      ]
    }),
    [chartType, color, data, lineColor]
  );

  if (!data.length) {
    return <div className="" />;
  }

  // return (
  //   <div className="h-5 w-12 shrink-0">
  //     <Chart options={chartData} />
  //   </div>
  // );
  return <Chart options={chartData} />;
}

MiniChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number),
  color: PropTypes.string,
  lineColor: PropTypes.string,
  chartType: PropTypes.string
};
MiniChart.defaultProps = {
  data: [],
  color: '#FFE9E9',
  lineColor: '#FB7373',
  chartType: 'column'
};
