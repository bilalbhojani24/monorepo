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
    acc[key] = data[key];
    return acc;
  }, {})
});

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
    <div className="time-chart-tooltip">
      <section className="tooltip-info tooltip-info--chart-title">
        {!Number.isNaN(+tooltipData.queuedAt) && (
          <p className="time-info">{`Queued at ${formatTime(
            tooltipData.queuedAt
          )}`}</p>
        )}
        {!Number.isNaN(+tooltipData.startedAt) && (
          <p className="time-info">{`Started at ${formatTime(
            tooltipData.startedAt
          )}`}</p>
        )}
      </section>
      <>
        <div className="time-chart-tooltip__chart-title">request timing</div>
        <TimeChart
          maxTime={maxTime}
          timings={reqDetail?.timings || data}
          isWaterfall={false}
          renderFrom={fromRequestDetail ? 'request-detail' : 'tooltip'}
        />
        {!!reqDetail && <hr />}
      </>
      {DETAIL.map(({ title, category }) =>
        category.some(
          (key) => !Number.isNaN(+tooltipData[TIMINGS[key].dataKey])
        ) ? (
          <section key={title} className="tooltip-info">
            <table className="waterfall-tooltip-table">
              <thead className="waterfall-tooltip-thead">
                <tr className="waterfall-tooltip-tr">
                  <th className="waterfall-tooltip-th" colSpan="2">
                    {title}
                  </th>
                </tr>
              </thead>
              <tbody className="waterfall-tooltip-tbody">
                {category.map((key) =>
                  Number.isNaN(+tooltipData[TIMINGS[key].dataKey]) ? null : (
                    <tr key={key} className="waterfall-tooltip-tr">
                      <td
                        className={twClassNames('waterfall-tooltip-key', key)}
                      >
                        {TIMINGS[key].name}
                      </td>
                      <td className="waterfall-tooltip-value">
                        {formatTime(tooltipData[TIMINGS[key].dataKey])}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </section>
        ) : null
      )}
      <section className="tooltip-info">
        <div className="total-time">
          <div className="total-time--title">TOTAL</div>
          <div className="total-time--time">
            {formatTime(tooltipData.totalTime)}
          </div>
        </div>
      </section>
    </div>
  );
};

TimeChartTooltip.propTypes = {
  data: PropTypes.object.isRequired,
  fromRequestDetail: PropTypes.bool.isRequired
};

export default TimeChartTooltip;
