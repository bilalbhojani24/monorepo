import React from 'react';
import { DataVisualization } from '@browserstack/bifrost';
import Chart from 'common/Chart';
import { events, severityOptions } from 'constants';
import PropTypes from 'prop-types';
import { handleClickByEnterOrSpace } from 'utils/helper';

import useSummaryChart from './useSummaryChart';

export default function SummaryChart({
  actionType,
  eventName,
  issueSummary,
  onRowClick
}) {
  const { chartOption } = useSummaryChart({
    actionType,
    eventName,
    issueSummary,
    onRowClick
  });
  return (
    <div>
      <DataVisualization
        title="Issue summary"
        headerInfo={null}
        wrapperClassName="h-[440px]"
        size="fit-content"
        analytics={
          <div className="flex w-full items-center justify-between">
            <div className="w-2/4">
              <Chart options={chartOption} />
            </div>
            <div className="flex w-2/4 flex-col items-center px-6">
              <div className="w-full">
                {severityOptions.map(({ value: impact, meta: { color } }) => (
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
                    <p className="text-base-800 flex pb-3 text-sm">
                      {issueSummary[impact]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}

SummaryChart.propTypes = {
  actionType: PropTypes.string,
  eventName: PropTypes.string,
  issueSummary: PropTypes.objectOf({
    critical: PropTypes.number,
    serious: PropTypes.number,
    moderate: PropTypes.number,
    minor: PropTypes.number,
    issueCount: PropTypes.number
  }).isRequired,
  onRowClick: PropTypes.func
};

SummaryChart.defaultProps = {
  actionType: events.INTERACT_WITH_CHART,
  eventName: '',
  onRowClick: () => {}
};
