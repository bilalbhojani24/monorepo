import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Virtuoso } from 'react-virtuoso';
import classNames from 'classnames';
import MiniChart from 'common/MiniChart';
import O11yLoader from 'common/O11yLoader/components/O11yLoader';
import TrendStatesWrapper from 'features/TestingTrends/components/TrendStatesWrapper';
import { getAllTTFilters } from 'features/TestingTrends/slices/selectors';
import { getTrendStabilityData } from 'features/TestingTrends/slices/testingTrendsSlice';
import { getProjects } from 'globalSlice/selectors';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';

const LoadingFooter = () => (
  <div className="">
    <O11yLoader />
  </div>
);

const StabilityTableItem = React.memo(
  ({ item, index, handleBuildSelect, selectedBuild }) => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className={classNames(
        'flex items-center text-xs border-b border-base-300 h-12 p-2',
        {
          'to-trend-stability-table__item--active': selectedBuild === item.id,
          'to-trend-stability-table__item--greyBg': index % 2 !== 0
        }
      )}
      key={item.id}
      role="button"
      tabIndex={0}
      onClick={() => handleBuildSelect(item.id)}
    >
      <div className="flex-1">{item.buildName}</div>
      <div className="flex h-full flex-1">
        <MiniChart
          data={item.chartData || []}
          lineColor="#376D98"
          color="#E5EEF8"
          type="area"
        />
        <p className="pl-2">{item.percentage}%</p>
      </div>
    </div>
  )
);

export default function StabilityTable({ handleBuildSelect, selectedBuild }) {
  const filters = useSelector(getAllTTFilters);
  const [stabilityData, setStabilityData] = useState({});
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const dispatch = useDispatch();
  const projects = useSelector(getProjects);
  const containerRef = useRef(null);

  const fetchData = useCallback(
    ({ newPage = false, currentPagingParams }) => {
      dispatch(
        getTrendStabilityData({
          normalisedName: projects.active?.normalisedName,
          filters,
          currentPagingParams
        })
      )
        .unwrap()
        .then((res) => {
          if (newPage) {
            setStabilityData((prev) => ({
              data: [...prev.data, ...res?.data],
              pagingParam: res?.pagingParam
            }));
          } else {
            setStabilityData(res);
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
    [dispatch, filters, handleBuildSelect, projects.active?.normalisedName]
  );

  const loadInitialData = useCallback(() => {
    setStabilityData({});
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
    if (stabilityData?.pagingParam?.hasNext) {
      setIsLoadingMore(true);
      fetchData({
        newPage: true,
        currentPagingParams: stabilityData?.pagingParam
      });
    }
  };

  return (
    <TrendStatesWrapper
      isLoading={isLoading}
      isEmpty={isEmpty(stabilityData?.data)}
      hasError={hasError}
      onClickCTA={loadInitialData}
      showTitle={false}
    >
      <div className="flex h-96 flex-1 flex-col overflow-y-scroll px-4 pb-4 pt-0 text-sm">
        <div className="border-base-300 flex items-center border-b p-2 font-semibold">
          <div className="flex-1">BUILD NAME</div>
          <div className="flex-1">STABILITY</div>
        </div>
        <div className="relative h-96" ref={containerRef}>
          {!!stabilityData?.data?.length && (
            <Virtuoso
              customScrollParent={containerRef.current}
              data={stabilityData.data}
              overscan={100}
              endReached={loadMoreRows}
              itemContent={(index, item) => (
                <StabilityTableItem
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

StabilityTable.propTypes = {
  handleBuildSelect: PropTypes.func.isRequired,
  selectedBuild: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
StabilityTable.defaultProps = {
  selectedBuild: ''
};
StabilityTableItem.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  handleBuildSelect: PropTypes.func.isRequired,
  selectedBuild: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
StabilityTableItem.defaultProps = {
  selectedBuild: ''
};
