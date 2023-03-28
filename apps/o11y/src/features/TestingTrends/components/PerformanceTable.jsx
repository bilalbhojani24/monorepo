import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { twClassNames } from '@browserstack/utils';
import { O11yTableCell, O11yTableRow } from 'common/bifrostProxy';
import MiniChart from 'common/MiniChart';
import VirtualisedTable from 'common/VirtualisedTable';
import { getTrendPerformanceData } from 'features/TestingTrends/slices/testingTrendsSlice';
import { getActiveProject, getProjects } from 'globalSlice/selectors';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { abbrNumber, logOllyEvent } from 'utils/common';
import { milliSecondsToTime } from 'utils/dateTime';

import { getAllTTFilters } from '../slices/selectors';

import TrendStatesWrapper from './TrendStatesWrapper';

const FontMediumBase500 = 'font-medium text-base-500';
const PerformanceTableItem = React.memo(({ item, selectedBuild }) => (
  <>
    <O11yTableCell
      wrapperClassName={twClassNames('font-medium text-base-900', {
        'bg-base-100 bg-opacity-5': selectedBuild === item?.buildName
      })}
    >
      {item?.buildName}
    </O11yTableCell>
    <O11yTableCell
      wrapperClassName={twClassNames(FontMediumBase500, {
        'bg-base-100 bg-opacity-5': selectedBuild === item?.buildName
      })}
    >
      <div className="flex">
        <div className="h-5 w-12 shrink-0">
          <MiniChart
            data={item?.lineChartData || []}
            lineColor="#376D98"
            color="#E5EEF8"
            chartType="area"
          />
        </div>
        <p className="pl-2">{abbrNumber(item?.testCount)}</p>
      </div>
    </O11yTableCell>
    <O11yTableCell
      wrapperClassName={twClassNames(FontMediumBase500, {
        'bg-base-100 bg-opacity-5': selectedBuild === item?.buildName
      })}
    >
      <div className="flex">
        <div className="h-5 w-12 shrink-0">
          <MiniChart
            data={item?.barChartData || []}
            color="#9DD0CA"
            chartType="column"
          />
        </div>
        <p className="pl-2">{milliSecondsToTime(item?.avgDuration)}</p>
      </div>
    </O11yTableCell>
  </>
));

export default function PerformanceTable({ handleBuildSelect, selectedBuild }) {
  const activeProject = useSelector(getActiveProject);
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
              handleBuildSelect(res?.data?.[0]?.buildName);
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
    const selectedId = performanceData?.data[id]?.buildName;
    logOllyEvent({
      event: 'O11yTestingTrendsInteracted',
      data: {
        project_name: activeProject.name,
        project_id: activeProject.id,
        interaction: 'performance_build_name_clicked',
        build_name: selectedId
      }
    });
    handleBuildSelect(selectedId);
  };

  return (
    <TrendStatesWrapper
      isLoading={isLoading}
      isEmpty={isEmpty(performanceData?.data)}
      hasError={hasError}
      onClickCTA={loadInitialData}
    >
      {!isLoading && (
        <div className="flex h-full flex-col">
          <VirtualisedTable
            data={performanceData?.data}
            endReached={loadMoreRows}
            overscan={100}
            showFixedFooter={isLoadingMore}
            tableContainerWrapperClassName="border-none rounded-none md:rounded-none shadow-none overflow-visible overflow-x-visible md:rounded-none"
            itemContent={(index, singleBuildData) => (
              <PerformanceTableItem
                item={singleBuildData}
                selectedBuild={selectedBuild}
              />
            )}
            fixedHeaderContent={() => (
              <O11yTableRow wrapperClassName="bg-white font-semibold">
                <O11yTableCell
                  isSticky
                  wrapperClassName="text-base-900 bg-white"
                >
                  BUILD NAME
                </O11yTableCell>
                <O11yTableCell
                  isSticky
                  wrapperClassName="text-base-900 bg-white"
                >
                  TESTS
                </O11yTableCell>
                <O11yTableCell
                  isSticky
                  wrapperClassName="text-base-900 bg-white"
                >
                  AVG. DURATION
                </O11yTableCell>
              </O11yTableRow>
            )}
            handleRowClick={handleClickBuildItem}
          />
        </div>
      )}
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
