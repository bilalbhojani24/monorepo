import React, { useMemo } from 'react';
import Chart from 'common/Chart';
import PropTypes from 'prop-types';

const CHART_OPTIONS = {
  chart: {
    type: 'area',
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
    // series: {
    //   color: '#FB7373'
    // },
    area: {
      lineWidth: 1
    }
  }
};

export default function MiniLineChart({ data, color, lineColor }) {
  const chartData = useMemo(
    () => ({
      ...CHART_OPTIONS,
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
          animation: false,
          name: '',
          color,
          lineColor,
          data
        }
      ]
    }),
    [color, data, lineColor]
  );

  if (!data.length) {
    return <div className="" />;
  }

  return (
    <div className="h-96">
      <Chart options={chartData} />
    </div>
  );
}

MiniLineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number),
  color: PropTypes.string,
  lineColor: PropTypes.string
};
MiniLineChart.defaultProps = {
  data: [],
  color: '#FFE9E9',
  lineColor: '#FB7373'
};
