import React from 'react';
import { DataVisualization } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import Chart from 'common/Chart';
import { events, severityOptions } from 'constants';
import PropTypes from 'prop-types';
import { handleClickByEnterOrSpace } from 'utils/helper';

import useSummaryChart from './useSummaryChart';

export default function SummaryChart({
  actionType,
  title,
  eventName,
  summary,
  totalCount,
  chartTitle,
  wrapperClassName,
  onRowClick
}) {
  const { chartOption } = useSummaryChart({
    actionType,
    eventName,
    summary,
    totalCount,
    chartTitle,
    onRowClick
  });
  return (
    <DataVisualization
      title={title}
      headerInfo={null}
      wrapperClassName={twClassNames('h-[440px] bg-white', wrapperClassName)}
      size="fit-content"
      analytics={
        <div className="flex w-full items-center justify-between">
          <div className="w-2/4">
            <Chart options={chartOption} />
          </div>
          <div className="flex w-2/4 flex-col items-center px-6">
            <div className="w-full">
              {summary.map(({ value: impact, color, y: count }) => (
                <div
                  aria-label={impact}
                  tabIndex={0}
                  className="border-base-200 mb-4 flex h-6 cursor-pointer items-center justify-between border-b"
                  // onClick={() =>
                  //   onRowClick(
                  //     'impact',
                  //     severityOptions.find(({ value }) => value === impact)
                  //   )
                  // }
                  // onKeyDown={(e) =>
                  //   handleClickByEnterOrSpace(e, () =>
                  //     onRowClick(
                  //       'impact',
                  //       severityOptions.find(({ value }) => value === impact)
                  //     )
                  //   )
                  // }
                  role="button"
                >
                  <div className="text-base-800 flex items-center pb-3 text-sm">
                    <div className={`mr-1.5 h-2 w-2 rounded-full ${color}`} />
                    {impact.charAt(0).toUpperCase()}
                    {impact.slice(1, impact.length)}
                  </div>
                  <p className="text-base-800 flex pb-3 text-sm">{count}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    />
  );
}

SummaryChart.propTypes = {
  title: PropTypes.string.isRequired,
  actionType: PropTypes.string,
  eventName: PropTypes.string,
  totalCount: PropTypes.number.isRequired,
  chartTitle: PropTypes.string.isRequired,
  summary: PropTypes.objectOf({
    critical: PropTypes.number,
    serious: PropTypes.number,
    moderate: PropTypes.number,
    minor: PropTypes.number,
    issueCount: PropTypes.number
  }).isRequired,
  onRowClick: PropTypes.func,
  wrapperClassName: PropTypes.string
};

SummaryChart.defaultProps = {
  actionType: events.INTERACT_WITH_CHART,
  eventName: '',
  wrapperClassName: '',
  onRowClick: () => {}
};
