import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdLock, MdOpenInNew } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import {
  O11yButton,
  O11yTableCell,
  O11yTableRow,
  O11yTooltip
} from 'common/bifrostProxy';
import VirtualisedTable from 'common/VirtualisedTable';
import { roundedTableHeaderHack } from 'constants/common';
import { ADV_FILTER_TYPES } from 'features/FilterSkeleton/constants';
import { getTrendBuildFrequencyData } from 'features/TestingTrends/slices/testingTrendsSlice';
import { getActiveProject, getProjects } from 'globalSlice/selectors';
import isEmpty from 'lodash/isEmpty';
import max from 'lodash/max';
import PropTypes from 'prop-types';
import { abbrNumber, getCurrentUrl } from 'utils/common';
import { getSuitHealthPath } from 'utils/routeUtils';

import TrendStatesWrapper from '../components/TrendStatesWrapper';
import { getAllTTFilters } from '../slices/selectors';

const TABLE_CLASSES = {
  ROW_CLASSES:
    'overflow-hidden border-b border-base-300 whitespace-normal break-words',
  HEADER_CLASSES: 'py-3 border-t border-base-300 text-xs font-medium z-[2]'
};

const BuildRunsList = React.memo(
  ({ item, maxRunCount, onViewBuild, viewBuildRunLocked }) => (
    <>
      <O11yTableCell
        wrapperClassName={twClassNames(
          TABLE_CLASSES.ROW_CLASSES,
          'text-base-900 border-l border-l-base-300'
        )}
      >
        {item.buildName}
      </O11yTableCell>
      <O11yTableCell
        wrapperClassName={twClassNames(
          TABLE_CLASSES.ROW_CLASSES,
          'border-r border-r-base-300'
        )}
      >
        <O11yTooltip
          placementSide="top"
          placementAlign="center"
          wrapperClassName="p-3"
          triggerWrapperClassName="flex items-center"
          theme="dark"
          content={
            <section className="pointer-events-auto flex flex-col pt-1">
              <O11yButton
                wrapperClassName="font-medium flex items-center gap-1 text-white hover:text-white hover:bg-brand-900 -mx-3 px-4 py-1 rounded-none"
                onClick={() => onViewBuild(item.buildName)}
                variant="minimal"
                icon={
                  viewBuildRunLocked ? (
                    <MdLock className="text-base-400 text-lg" />
                  ) : (
                    <MdOpenInNew className="text-lg text-white" />
                  )
                }
                iconPlacement="end"
              >
                View build runs
              </O11yButton>
            </section>
          }
        >
          <>
            <div
              className="mr-3 h-3 rounded-r-lg"
              style={{
                width: `${(item.runs / maxRunCount) * 100}%`,
                backgroundColor: '#865CC1'
              }}
            />
            <p className="shrink-0 pl-2">{abbrNumber(item.runs)}</p>
          </>
        </O11yTooltip>
      </O11yTableCell>
    </>
  )
);

export default function BuildRunFreqTrend() {
  const filters = useSelector(getAllTTFilters);
  const [buildData, setBuildData] = useState({ data: [] });
  const dispatch = useDispatch();
  const projects = useSelector(getProjects);
  const activeProject = useSelector(getActiveProject);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const viewBuildRunLocked = false;

  const onViewBuildClick = (buildName) => {
    if (viewBuildRunLocked) return;

    const searchParams = new URLSearchParams();
    searchParams.set(ADV_FILTER_TYPES.uniqueBuildNames.key, buildName);
    const url = `${getCurrentUrl()}${getSuitHealthPath(
      activeProject.normalisedName
    )}?${searchParams.toString()}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const fetchData = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
    dispatch(
      getTrendBuildFrequencyData({
        normalisedName: projects.active?.normalisedName,
        filters
      })
    )
      .unwrap()
      .then((res) => {
        setBuildData(res);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, projects.active?.normalisedName, filters]);

  useEffect(() => {
    if (projects.active?.normalisedName) {
      fetchData();
    }
  }, [fetchData, projects.active?.normalisedName]);

  const handleBottomChange = useCallback((state) => {
    setIsAtBottom(state);
  }, []);

  const containerRef = useRef(null);
  const maxRunCount = max(buildData?.data?.map(({ runs }) => runs));

  return (
    <TrendStatesWrapper
      isLoading={isLoading}
      isEmpty={isEmpty(buildData?.data)}
      hasError={hasError}
      onClickCTA={fetchData}
    >
      {!isLoading && (
        <div className="h-full flex-1">
          <VirtualisedTable
            data={buildData?.data}
            showFixedFooter={isAtBottom}
            tableWrapperClassName="bg-white border-separate border-spacing-0 table-fixed"
            tableContainerWrapperClassName="border-none overflow-visible overflow-x-visible bg-transparent ring-0 shadow-none rounded-none pb-6"
            customScrollParent={containerRef.current}
            itemContent={(index, singleBuildData) => (
              <BuildRunsList
                item={singleBuildData}
                maxRunCount={maxRunCount}
                onViewBuild={(buildName) => onViewBuildClick(buildName)}
                viewBuildRunLocked={viewBuildRunLocked}
              />
            )}
            fixedHeaderContent={() => (
              <O11yTableRow>
                <O11yTableCell
                  isSticky
                  wrapperClassName={twClassNames(
                    TABLE_CLASSES.HEADER_CLASSES,
                    'border-l border-l-base-300',
                    roundedTableHeaderHack.common,
                    roundedTableHeaderHack.left
                  )}
                >
                  BUILD NAME
                </O11yTableCell>
                <O11yTableCell
                  isSticky
                  wrapperClassName={twClassNames(
                    TABLE_CLASSES.HEADER_CLASSES,
                    'border-r border-r-base-300 text-right w-3/5',
                    roundedTableHeaderHack.common,
                    roundedTableHeaderHack.right
                  )}
                >
                  RUNS
                </O11yTableCell>
              </O11yTableRow>
            )}
            atBottomStateChange={handleBottomChange}
            handleRowClick={() => {}}
          />
        </div>
      )}
    </TrendStatesWrapper>
  );
}

BuildRunsList.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  maxRunCount: PropTypes.number.isRequired,
  onViewBuild: PropTypes.func.isRequired,
  viewBuildRunLocked: PropTypes.bool.isRequired
};
