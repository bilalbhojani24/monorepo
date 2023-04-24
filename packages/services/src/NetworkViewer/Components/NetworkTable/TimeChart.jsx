import React, { useMemo } from 'react';
import { Tooltip, TooltipBody } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { TIMINGS } from '../../constants';
import { formatTime } from '../../utils';

const calcChartAttributes = (data, maxTime, isWaterfall) => {
  // If not waterfall chart then remove startTime key so that only the actual request data can be plotted.
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
      duration: consideredValue,
      key
    };
  });
};

const TimeChart = ({ timings, maxTime, isWaterfall, renderFrom }) => {
  const chartAttributes = useMemo(
    () => calcChartAttributes(timings, maxTime, isWaterfall),
    [timings, maxTime, isWaterfall]
  );

  const isFromReqTiming = renderFrom === 'request-detail';

  return (
    <div className="flex overflow-hidden rounded-xl">
      {isWaterfall && (
        <div
          style={{
            width: `${(timings.startTime / maxTime) * 100}%`
          }}
        />
      )}
      {chartAttributes.map((chartProps) => (
        <div
          className={twClassNames('h-3 min-w-[1px]', {
            'h-4': isWaterfall,
            relative: isFromReqTiming
          })}
          style={{
            width: chartProps.width,
            backgroundColor: chartProps.fill
          }}
          key={chartProps.key}
        >
          {isFromReqTiming && (
            <Tooltip
              theme="dark"
              placementSide="top"
              triggerAsChild
              triggerWrapperClassName="w-full h-full absolute left-0 top-0"
              content={
                <TooltipBody>
                  <p className="text-sm">
                    {TIMINGS[chartProps.key].name}:{' '}
                    {formatTime(chartProps.duration) || '0 ms'}
                  </p>
                </TooltipBody>
              }
            >
              <div
                type="button"
                className="h-full w-full cursor-pointer overflow-hidden"
                role="presentation"
              />
            </Tooltip>
          )}
        </div>
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
