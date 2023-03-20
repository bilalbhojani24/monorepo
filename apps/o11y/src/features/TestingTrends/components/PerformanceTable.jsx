import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { twClassNames } from '@browserstack/utils';
import { O11yTableCell, O11yTableRow } from 'common/bifrostProxy';
import MiniChart from 'common/MiniChart';
import VirtualisedTable from 'common/VirtualisedTable';
import { getTrendPerformanceData } from 'features/TestingTrends/slices/testingTrendsSlice';
import { getProjects } from 'globalSlice/selectors';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { abbrNumber } from 'utils/common';
import { milliSecondsToTime } from 'utils/dateTime';

import { getAllTTFilters } from '../slices/selectors';

import TrendStatesWrapper from './TrendStatesWrapper';

const PerformanceTableItem = React.memo(({ item, selectedBuild }) => (
  <>
    <O11yTableCell
      wrapperClassName={twClassNames({
        'bg-[#0070f0] bg-opacity-5': selectedBuild === item?.id
      })}
    >
      {item?.buildName}
    </O11yTableCell>
    <O11yTableCell
      wrapperClassName={twClassNames({
        'bg-[#0070f0] bg-opacity-5': selectedBuild === item?.id
      })}
    >
      <div className="flex">
        <MiniChart
          data={item.lineChartData || []}
          lineColor="#376D98"
          color="#E5EEF8"
          type="areaspline"
        />
        <p className="pl-2">{abbrNumber(item.testCount)}</p>
      </div>
    </O11yTableCell>
    <O11yTableCell
      wrapperClassName={twClassNames({
        'bg-[#0070f0] bg-opacity-5': selectedBuild === item?.id
      })}
    >
      <div className="flex">
        <MiniChart
          data={item.barChartData || []}
          color="#9DD0CA"
          type="column"
        />
        <p className="pl-2">{milliSecondsToTime(item.avgDuration)}</p>
      </div>
    </O11yTableCell>
  </>
));

export default function PerformanceTable({ handleBuildSelect, selectedBuild }) {
  const filters = useSelector(getAllTTFilters);
  const [performanceData, setPerformanceData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const dispatch = useDispatch();
  const projects = useSelector(getProjects);

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

  const handleClickBuildItem = (id) => {
    const selectedId = performanceData?.data[id]?.id;
    handleBuildSelect(selectedId);
  };

  return (
    <TrendStatesWrapper
      isLoading={isLoading}
      isEmpty={isEmpty(performanceData?.data)}
      hasError={hasError}
      onClickCTA={loadInitialData}
      showTitle={false}
    >
      <div className="flex h-96 flex-col p-5">
        <VirtualisedTable
          data={performanceData?.data}
          endReached={loadMoreRows}
          overscan={100}
          showFixedFooter={isLoadingMore}
          itemContent={(index, singleBuildData) => (
            <PerformanceTableItem
              item={singleBuildData}
              selectedBuild={selectedBuild}
            />
          )}
          fixedHeaderContent={() => (
            <O11yTableRow>
              <O11yTableCell>BUILD NAME</O11yTableCell>
              <O11yTableCell>TESTS</O11yTableCell>
              <O11yTableCell>AVG. DURATION</O11yTableCell>
            </O11yTableRow>
          )}
          handleRowClick={handleClickBuildItem}
        />
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
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  selectedBuild: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
PerformanceTableItem.defaultProps = {
  selectedBuild: ''
};
