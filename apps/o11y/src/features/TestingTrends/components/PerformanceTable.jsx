import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Virtuoso } from 'react-virtuoso';
import { twClassNames } from '@browserstack/utils';
import MiniChart from 'common/MiniChart';
import O11yLoader from 'common/O11yLoader/components/O11yLoader';
import { getTrendPerformanceData } from 'features/TestingTrends/slices/testingTrendsSlice';
import { getProjects } from 'globalSlice/selectors';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { abbrNumber } from 'utils/common';
import { milliSecondsToTime } from 'utils/dateTime';

import { getAllTTFilters } from '../slices/selectors';

import TrendStatesWrapper from './TrendStatesWrapper';

const LoadingFooter = () => (
  <div className="">
    <O11yLoader />
  </div>
);

const PerformanceTableItem = React.memo(
  ({ item, index, handleBuildSelect, selectedBuild }) => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className={twClassNames(
        'flex h-full text-sm items-center cursor-pointer h-12 p-2 border-b border-base-300',
        {
          'to-trend-perf-table__item--active': selectedBuild === item.id,
          'to-trend-perf-table__item--greyBg': index % 2 !== 0
        }
      )}
      key={item.id}
      role="button"
      tabIndex={0}
      onClick={() => handleBuildSelect(item.id)}
    >
      <div className="flex-1 ">{item.buildName}</div>
      <div className="flex flex-1">
        <MiniChart
          data={item.lineChartData || []}
          lineColor="#376D98"
          color="#E5EEF8"
          type="areaspline"
        />
        <p className="pl-2">{abbrNumber(item.testCount)}</p>
      </div>
      <div className="flex flex-1">
        <MiniChart
          data={item.barChartData || []}
          color="#9DD0CA"
          type="column"
        />
        <p className="pl-2">{milliSecondsToTime(item.avgDuration)}</p>
      </div>
    </div>
  )
);

export default function PerformanceTable({ handleBuildSelect, selectedBuild }) {
  const filters = useSelector(getAllTTFilters);
  const [performanceData, setPerformanceData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const dispatch = useDispatch();
  const projects = useSelector(getProjects);
  const containerRef = useRef(null);

  const fetchData = useCallback(
    ({ newPage = false, currentPagingParams }) => {
      dispatch(
        getTrendPerformanceData({
          normalisedName: projects.active?.normalisedName,
          filters,
          currentPagingParams
        })
      )
        .unwrap()
        .then((res) => {
          if (newPage) {
            setPerformanceData((prev) => ({
              data: [...prev.data, ...res?.data],
              pagingParam: res?.pagingParam
            }));
          } else {
            setPerformanceData(res);
            if (!selectedBuild) {
              handleBuildSelect(res?.data?.[0]?.id);
            }
          }
        })
        .catch(() => {
          setHasError(true);
        })
        .finally(() => {
          setIsLoading(false);
          setIsLoadingMore(false);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, handleBuildSelect, projects.active?.normalisedName, filters]
  );

  const loadInitialData = useCallback(() => {
    setPerformanceData({});
    setIsLoading(true);
    setHasError(false);
    fetchData({});
  }, [fetchData]);

  useEffect(() => {
    if (projects.active?.normalisedName) {
      loadInitialData();
    }
  }, [loadInitialData, projects.active?.normalisedName]);

  const loadMoreRows = () => {
    if (performanceData?.pagingParam?.hasNext) {
      setIsLoadingMore(true);
      fetchData({
        newPage: true,
        currentPagingParams: performanceData?.pagingParam
      });
    }
  };

  return (
    <TrendStatesWrapper
      isLoading={isLoading}
      isEmpty={isEmpty(performanceData?.data)}
      hasError={hasError}
      onClickCTA={loadInitialData}
      showTitle={false}
    >
      <div className="flex h-96 flex-col overflow-y-scroll px-5 pt-0 pb-5">
        <div className="border-base-300 flex items-center rounded-sm border-b p-2 text-sm">
          <div className="flex-1 font-medium">BUILD NAME</div>
          <div className="flex-1 font-medium">TESTS</div>
          <div className="flex-1 font-medium">AVG. DURATION</div>
        </div>
        <div className="relative" ref={containerRef}>
          {!!performanceData?.data?.length && (
            <Virtuoso
              customScrollParent={containerRef.current}
              data={performanceData.data}
              style={{ height: 300 }}
              overscan={100}
              endReached={loadMoreRows}
              itemContent={(index, item) => (
                <PerformanceTableItem
                  item={item}
                  index={index}
                  handleBuildSelect={handleBuildSelect}
                  selectedBuild={selectedBuild}
                />
              )}
              components={{
                Footer: isLoadingMore ? LoadingFooter : null
              }}
            />
          )}
        </div>
      </div>
    </TrendStatesWrapper>
  );
}

PerformanceTable.propTypes = {
  handleBuildSelect: PropTypes.func.isRequired,
  selectedBuild: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
PerformanceTable.defaultProps = {
  selectedBuild: ''
};

PerformanceTableItem.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  handleBuildSelect: PropTypes.func.isRequired,
  selectedBuild: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
PerformanceTableItem.defaultProps = {
  selectedBuild: ''
};
