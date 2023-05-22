import React from 'react';
import { Button, MdLock, MdOpenInNew } from '@browserstack/bifrost';
import { SNP_PARAMS_MAPPING } from 'constants/common';
import PropTypes from 'prop-types';
import { getBaseUrl } from 'utils/common';
import { getCustomTimeStamp, milliSecondsToTime } from 'utils/dateTime';

export default function CustomChartTooltip({
  activeProject,
  filters,
  tooltipData
}) {
  const isLocked = false;

  const handleActionClick = () => {
    if (isLocked) return;

    const url = `${getBaseUrl()}:8081/projects/${
      activeProject.normalisedName
    }/suite_health?${SNP_PARAMS_MAPPING.snpActiveBuild}=${
      filters.buildName.value
    }&${SNP_PARAMS_MAPPING.snpDateRange}=${filters.dateRange.key}`;
    console.log(url);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const renderPointValue = (value, fixedToTwoDigits, pointName) => {
    if (value === null || value === undefined) return null;

    if (pointName === 'Average Duration') {
      return milliSecondsToTime(value);
    }

    return fixedToTwoDigits ? value.toFixed(2) : value;
  };

  const renderMetaData = (data) => (
    <div>
      {tooltipData[0]?.pointRangeOptions && (
        <span className="text-sm font-medium">
          {getCustomTimeStamp({
            dateString: tooltipData[0]?.pointRangeOptions[0],
            withoutTime: true
          })}{' '}
          -{' '}
          {getCustomTimeStamp({
            dateString: tooltipData[0]?.pointRangeOptions[1],
            withoutTime: true
          })}
        </span>
      )}
      {data.map((point) => {
        if (point.y === null || point.y === undefined) return null;
        return (
          <div className="flex justify-between text-sm">
            <div>
              <span
                className="mb-0.5 mr-1 inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: point?.color }}
              />
              <span className="text-sm">{point.name}</span>
            </div>
            <span>
              {renderPointValue(point.y, point.fixedToTwoDigits, point.name)}
            </span>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="bg-base-800 text-base-200 flex flex-col rounded-lg px-3 py-1 text-white">
      <section className="border-brand-900 flex flex-col gap-1 border-b pb-2">
        {renderMetaData(tooltipData)}
      </section>
      <section className="pointer-events-auto flex flex-col pt-1">
        <Button
          wrapperClassName="font-medium flex items-center gap-1 text-white hover:text-white hover:bg-brand-900 -mx-3 px-4 py-1 rounded-none"
          onClick={handleActionClick}
          variant="minimal"
          icon={
            isLocked ? (
              <MdLock className="text-base-400 text-lg" />
            ) : (
              <MdOpenInNew className="text-lg text-white" />
            )
          }
          iconPlacement="end"
        >
          View tests (Pro)
        </Button>
      </section>
    </div>
  );
}

CustomChartTooltip.propTypes = {
  activeProject: PropTypes.objectOf(PropTypes.any).isRequired,
  filters: PropTypes.objectOf(PropTypes.any).isRequired,
  tooltipData: PropTypes.objectOf(PropTypes.any).isRequired
};
