import React, { useMemo } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { TIMINGS } from '../../constants';
import { useNetwork } from '../../state/Context';
import { formatTime } from '../../utils';

import TimeChart from './TimeChart';

const DETAIL = [
  {
    title: 'Resource Scheduling',
    category: ['queueing']
  },
  {
    title: 'Connection Start',
    category: ['blocked', 'dns', 'ssl', 'connect']
  },
  {
    title: 'Request/Response',
    category: ['send', 'wait', 'receive']
  }
];

const calcTotalTime = (data) =>
  Object.keys(data)
    .filter(
      (key) => !['_blocked_queueing', 'startTime', 'comment'].includes(key)
    )
    .reduce((acc, key) => acc + data[key], 0);

const prepareTooltipData = (data) => ({
  queuedAt: data.startTime,
  // eslint-disable-next-line no-underscore-dangle
  startedAt: data.startTime + data._blocked_queueing,
  totalTime: calcTotalTime(data),
  ...Object.keys(data).reduce((acc, key) => {
    const updatedData = acc;
    updatedData[key] = data[key];
    return updatedData;
  }, {})
});

const CHART_TITLE_CLASS = 'text-base-700 mb-2 text-sm font-semibold uppercase';

const TimeChartTooltip = ({ data, fromRequestDetail }) => {
  const { state } = useNetwork();
  const reqDetail = state.get('reqDetail');
  const tooltipData = useMemo(
    () => (!data ? null : prepareTooltipData(data)),
    [data]
  );
  const maxTime = state.get('totalNetworkTime');

  if (!tooltipData) {
    return null;
  }

  return (
    <div className="divide-base-200 w-full divide-y">
      <section className="text-base-700 flex flex-col gap-3">
        <div className="flex">
          {!Number.isNaN(+tooltipData.queuedAt) && (
            <p className="pr-2 text-sm">{`Queued at ${formatTime(
              tooltipData.queuedAt
            )}`}</p>
          )}
          {!Number.isNaN(+tooltipData.startedAt) && (
            <p className="border-l-base-300 border-l pl-2 text-sm">{`Started at ${formatTime(
              tooltipData.startedAt
            )}`}</p>
          )}
        </div>
        <div className="mb-3">
          <div className={CHART_TITLE_CLASS}>request timing</div>
          <TimeChart
            maxTime={maxTime}
            timings={reqDetail?.timings || data}
            isWaterfall={false}
            renderFrom={fromRequestDetail ? 'request-detail' : 'tooltip'}
          />
        </div>
      </section>
      {DETAIL.map(({ title, category }) =>
        category.some(
          (key) => !Number.isNaN(+tooltipData[TIMINGS[key].dataKey])
        ) ? (
          <section key={title} className="text-base-700 flex flex-col">
            <div className="py-3">
              <div className={CHART_TITLE_CLASS}>{title}</div>
              <div className="flex flex-col gap-2 pl-2">
                {category.map((key) =>
                  Number.isNaN(+tooltipData[TIMINGS[key].dataKey]) ? null : (
                    <p className="text-base-700 flex items-center justify-between text-sm">
                      <span className={twClassNames('flex items-center', key)}>
                        {TIMINGS?.[key]?.fill && (
                          <span
                            className="mr-2 inline-block h-2 w-2 shrink-0 rounded-lg"
                            style={{ backgroundColor: TIMINGS[key].fill }}
                          />
                        )}
                        <span>{TIMINGS[key].name}</span>
                      </span>
                      <span className="text-right">
                        {formatTime(tooltipData[TIMINGS[key].dataKey])}
                      </span>
                    </p>
                  )
                )}
              </div>
            </div>
          </section>
        ) : null
      )}
      <section className="flex items-center justify-between py-3">
        <span className={twClassNames(CHART_TITLE_CLASS, 'mb-0')}>TOTAL</span>
        <span className="text-base-700 text-sm">
          {formatTime(tooltipData.totalTime)}
        </span>
      </section>
    </div>
  );
};

TimeChartTooltip.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  fromRequestDetail: PropTypes.bool.isRequired
};

export default TimeChartTooltip;
