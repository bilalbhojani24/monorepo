import React, { useMemo } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { TIMINGS } from '../../constants';
import { formatTime } from '../../utils';

const calcChartAttributes = (data, maxTime, isWaterfall) => {
  // If not waterfall chart then remove startTime key so that only the actuall request data can be plotted.
  const totalTime = isWaterfall
    ? maxTime
    : Object.keys(data)
        .filter((item) => item !== 'startTime')
        .reduce((acc, curr) => (data[curr] > 0 ? data[curr] + acc : acc), 0);

  return Object.keys(TIMINGS).map((key) => {
    const timingInfo = TIMINGS[key];
    const value = data[timingInfo.dataKey];

    const consideredValue = !value || value <= 0 ? 0 : value;
    return {
      width: `${(consideredValue / totalTime) * 100}%`,
      fill: timingInfo.fill,
      duration: data[key],
      key
    };
  });
};

const TimeChart = ({ timings, maxTime, isWaterfall, renderFrom }) => {
  const chartAttributes = useMemo(
    () => calcChartAttributes(timings, maxTime, isWaterfall),
    [timings, maxTime, isWaterfall]
  );

  return (
    <div
      className={twClassNames('har-time-chart', {
        'har-time-chart--waterfall': isWaterfall,
        'har-time-chart--thin': !isWaterfall && renderFrom === 'time-cell'
      })}
    >
      {isWaterfall && (
        <div
          style={{
            width: `${(timings.startTime / maxTime) * 100}%`
          }}
        />
      )}
      {chartAttributes.map((chartProps) => (
        <div
          className="har-time-chart__item"
          style={{
            width: chartProps.width,
            backgroundColor: chartProps.fill
          }}
          key={chartProps.key}
          {...(renderFrom === 'request-detail'
            ? {
                'data-tip': `${TIMINGS[chartProps.key].name}: ${formatTime(
                  chartProps.duration
                )}`,
                'data-for': 'har-time-chart-tooltip'
              }
            : {})}
        />
      ))}
    </div>
  );
};

TimeChart.propTypes = {
  maxTime: PropTypes.number.isRequired,
  timings: PropTypes.object.isRequired,
  isWaterfall: PropTypes.bool,
  renderFrom: PropTypes.oneOf(['tooltip', 'time-cell', 'request-detail'])
    .isRequired
};

TimeChart.defaultProps = {
  isWaterfall: false
};

export default TimeChart;
