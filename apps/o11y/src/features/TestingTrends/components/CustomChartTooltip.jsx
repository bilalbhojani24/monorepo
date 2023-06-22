import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  MdLock,
  MdOpenInNew,
  TooltipBody
} from '@browserstack/bifrost';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import { ADV_FILTER_TYPES } from 'features/FilterSkeleton/constants';
import PropTypes from 'prop-types';
import { getCurrentUrl } from 'utils/common';
import { getCustomTimeStamp, milliSecondsToTime } from 'utils/dateTime';
import { getSuitHealthPath } from 'utils/routeUtils';

export default function CustomChartTooltip({
  activeProject,
  buildName,
  filters,
  header,
  id,
  tooltipData
}) {
  const dispatch = useDispatch();
  const isLocked = false;

  const transformOsString = (item) => {
    const os = item.trim();
    let str = `${os}_`;
    if (os.includes('OS X')) {
      const temp = os.split(' ');
      if (temp.length > 2) {
        str = `${temp[0]} ${temp[1]}_${temp[2]}`;
      } else {
        str = `${temp[0]} ${temp[1]}_`;
      }
    }
    return str;
  };

  const applySearchParam = (searchParams, browserList, osList) => {
    searchParams.set(ADV_FILTER_TYPES.browserList.key, browserList);
    searchParams.set(ADV_FILTER_TYPES.osList.key, osList);
  };

  // Note: Added this to Match Filter values on Test Details for CBT Trends
  const setDrillDownData = (searchParams) => {
    if (!tooltipData[0].options.drillDownData) {
      const browser = tooltipData[0].userOptions.id.split(',')[0];
      const os = transformOsString(tooltipData[0].userOptions.id.split(',')[1]);
      const browserVersion = tooltipData[0].options.name.split(',')[0];
      applySearchParam(searchParams, `${browser}_${browserVersion}`, os);

      return;
    }
    if (header.split(',')[0] === 'Unknown') {
      searchParams.set(ADV_FILTER_TYPES.osList.key, 'Unknown_Unknown');
      return;
    }

    const drillItem = tooltipData[0].options.drillDownData.find(
      (item) =>
        item.id ===
        (tooltipData[0].options.drilldown || tooltipData[0].options.name)
    )?.data;
    const browserListWithVersion = drillItem?.map((item) => {
      if (header.split(',')[1]) {
        return `${header.split(',')[0]}_${item.name.split(',')[0]}`;
      }
      return `${item.name.split(' ').join('_')}`;
    });

    if (header.split(',')[1]) {
      const str = transformOsString(header.split(',')[1]);
      applySearchParam(
        searchParams,
        browserListWithVersion.join(',') || header.split(',')[0],
        str
      );
      return;
    }
    searchParams.set(ADV_FILTER_TYPES.deviceList.key, header.split(',')[0]);
  };

  const handleActionClick = () => {
    if (isLocked) {
      dispatch(toggleModal({ version: 'drill_down_modal', data: {} }));
      return;
    }

    const searchParams = new URLSearchParams();

    switch (id) {
      case 'cbt':
        setDrillDownData(searchParams);
        break;
      case 'flakiness':
        searchParams.set(ADV_FILTER_TYPES.isFlaky.key, true);
        break;

      case 'alwaysFailing':
        searchParams.set(ADV_FILTER_TYPES.isAlwaysFailing.key, true);

        break;
      case 'newFailures':
        searchParams.set(ADV_FILTER_TYPES.isNewFailure.key, true);
        break;
      default:
        break;
    }

    if (buildName) {
      searchParams.set(ADV_FILTER_TYPES.uniqueBuildNames.key, buildName);
    }

    if (filters.buildName.value !== 'all') {
      searchParams.set(
        ADV_FILTER_TYPES.uniqueBuildNames.key,
        filters.buildName.value
      );
    }

    if (
      tooltipData[0] &&
      tooltipData[0]?.pointRangeOptions &&
      tooltipData[0]?.pointRangeOptions[0] &&
      tooltipData[0]?.pointRangeOptions[1]
    ) {
      searchParams.append('daterangetype', 'custom');
      searchParams.set(
        'dateRange',
        `${tooltipData[0]?.pointRangeOptions[0]},${tooltipData[0]?.pointRangeOptions[1]}`
      );
    } else {
      searchParams.append('daterangetype', filters.dateRange.key);
      if (filters.dateRange.key === 'custom') {
        searchParams.set(
          'dateRange',
          `${filters.dateRange.lowerBound},${filters.dateRange.upperBound}`
        );
      }
    }

    const url = `${getCurrentUrl()}${getSuitHealthPath(
      activeProject.normalisedName
    )}?${searchParams.toString()}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const renderPointValue = (data, value, fixedToTwoDigits, pointName) => {
    if (value === null || value === undefined) return null;

    if (pointName === 'Average Duration') {
      return milliSecondsToTime(value);
    }

    if (
      pointName === 'Flakiness' ||
      pointName === 'Always Failing' ||
      pointName === 'New failures'
    ) {
      return `${fixedToTwoDigits ? value.toFixed(2) : value} (${(
        (value / data[0]?.totalTest) *
        100
      ).toFixed(2)}%)`;
    }

    if (pointName === 'Stability' || pointName === 'Trendline') {
      return fixedToTwoDigits ? `(${value.toFixed(2)}%)` : `(${value}%)`;
    }

    return fixedToTwoDigits ? value.toFixed(2) : value;
  };

  const renderMetaData = (data) => (
    <div>
      {header && <span className="text-sm font-medium">{header}</span>}
      {data[0]?.pointRangeOptions && (
        <span className="text-sm font-medium">
          {getCustomTimeStamp({
            dateString: data[0]?.pointRangeOptions[0],
            withoutTime: true
          })}{' '}
          -{' '}
          {getCustomTimeStamp({
            dateString: data[0]?.pointRangeOptions[1],
            withoutTime: true
          })}
        </span>
      )}
      {data[0]?.category && (
        <span className="text-sm font-medium">
          {getCustomTimeStamp({
            dateString: data[0]?.category
          })}
        </span>
      )}
      {data?.map((point) => {
        if (point.y === null || point.y === undefined) return null;
        return (
          <div className="flex justify-between pt-2 text-sm" key={point.name}>
            <div>
              <span
                className="mb-0.5 mr-1 inline-block h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor: point?.options?.color || point?.color
                }}
              />
              <span className="text-sm">{point.name}</span>
            </div>
            <span>
              {renderPointValue(
                data,
                point.y,
                point.fixedToTwoDigits,
                point.name
              )}
            </span>
          </div>
        );
      })}
      {!!data[0]?.totalTest && (
        <div className="flex justify-between pt-2 text-sm">
          <span className="text-sm">Total Test</span>
          <span>{data[0]?.totalTest}</span>
        </div>
      )}
    </div>
  );

  return (
    <TooltipBody>
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
              <MdOpenInNew className="text-base-400 text-lg " />
            )
          }
          iconPlacement="end"
        >
          View tests
        </Button>
      </section>
    </TooltipBody>
  );
}

CustomChartTooltip.propTypes = {
  activeProject: PropTypes.objectOf(PropTypes.any).isRequired,
  buildName: PropTypes.string,
  filters: PropTypes.objectOf(PropTypes.any).isRequired,
  header: PropTypes.string,
  id: PropTypes.objectOf(PropTypes.any).isRequired,
  tooltipData: PropTypes.objectOf(PropTypes.any).isRequired
};

CustomChartTooltip.defaultProps = {
  buildName: null,
  header: null
};