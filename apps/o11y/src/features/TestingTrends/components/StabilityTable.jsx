import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { twClassNames } from '@browserstack/utils';
import { O11yTableCell, O11yTableRow } from 'common/bifrostProxy';
import MiniChart from 'common/MiniChart';
import VirtualisedTable from 'common/VirtualisedTable';
import TrendStatesWrapper from 'features/TestingTrends/components/TrendStatesWrapper';
import { getAllTTFilters } from 'features/TestingTrends/slices/selectors';
import { getTrendStabilityData } from 'features/TestingTrends/slices/testingTrendsSlice';
import { getActiveProject, getProjects } from 'globalSlice/selectors';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { logOllyEvent } from 'utils/common';

const StabilityTableItem = React.memo(({ item, selectedBuild }) => (
  <>
    <O11yTableCell
      wrapperClassName={twClassNames(
        'text-base-900 whitespace-normal break-normal',
        {
          'bg-base-100 bg-opacity-5': selectedBuild === item?.buildName
        }
      )}
    >
      {item?.buildName}
    </O11yTableCell>
    <O11yTableCell
      wrapperClassName={twClassNames('text-base-500', {
        'bg-base-100 bg-opacity-5': selectedBuild === item?.buildName
      })}
    >
      <div className="h-5 w-12 shrink-0">
        <MiniChart
          data={item?.chartData || []}
          lineColor="#376D98"
          color="#E5EEF8"
          chartType="area"
        />
      </div>
    </O11yTableCell>
    <O11yTableCell
      wrapperClassName={twClassNames('text-base-500', {
        'bg-base-100 bg-opacity-5': selectedBuild === item?.buildName
      })}
    >
      <p className="pl-2">{item?.percentage}%</p>
    </O11yTableCell>
  </>
));

export default function StabilityTable({ handleBuildSelect, selectedBuild }) {
  const activeProject = useSelector(getActiveProject);
  const filters = useSelector(getAllTTFilters);
  const [stabilityData, setStabilityData] = useState({});
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const dispatch = useDispatch();
  const projects = useSelector(getProjects);

  const checkIfDataExists = useCallback((prev, res) => {
    if (prev.data) {
      return [...prev?.data, ...res?.data];
    }

    return [...res?.data];
  }, []);

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
              data: checkIfDataExists(prev, res),
              pagingParam: res?.pagingParam
            }));
          } else {
            setStabilityData(res);
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

  const handleClickBuildItem = (id) => {
    const selectedName = stabilityData?.data[id]?.buildName;
    logOllyEvent({
      event: 'O11yTestingTrendsInteracted',
      data: {
        project_name: activeProject.name,
        project_id: activeProject.id,
        interaction: 'stability_build_name_clicked',
        build_name: selectedName
      }
    });
    handleBuildSelect(selectedName);
  };

  return (
    <TrendStatesWrapper
      isLoading={isLoading}
      isEmpty={isEmpty(stabilityData?.data)}
      hasError={hasError}
      onClickCTA={loadInitialData}
    >
      {!isLoading && (
        <div className="h-full flex-1">
          <VirtualisedTable
            data={stabilityData?.data}
            endReached={loadMoreRows}
            showFixedFooter={isLoadingMore}
            tableContainerWrapperClassName="overflow-visible overflow-x-visible md:rounded-none"
            itemContent={(index, singleBuildData) => (
              <StabilityTableItem
                item={singleBuildData}
                selectedBuild={selectedBuild}
              />
            )}
            fixedHeaderContent={() => (
              <O11yTableRow wrapperClassName="font-semibold">
                <O11yTableCell wrapperClassName="font-medium text-xs" isSticky>
                  BUILD NAME
                </O11yTableCell>
                <O11yTableCell
                  wrapperClassName="font-medium text-xs"
                  isSticky
                />
                <O11yTableCell wrapperClassName="font-medium text-xs" isSticky>
                  STABILITY
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

StabilityTable.propTypes = {
  handleBuildSelect: PropTypes.func.isRequired,
  selectedBuild: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
StabilityTable.defaultProps = {
  selectedBuild: ''
};
StabilityTableItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  selectedBuild: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
StabilityTableItem.defaultProps = {
  selectedBuild: ''
};
