import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineRefresh, MdSearchOff } from '@browserstack/bifrost';
import { O11yButton, O11yEmptyState } from 'common/bifrostProxy';
import EmptyPage from 'common/EmptyPage';
import O11yLoader from 'common/O11yLoader';
import VirtualisedTable from 'common/VirtualisedTable';
import { PUSHER_EVENTS } from 'constants/common';
import { getActiveProject } from 'globalSlice/selectors';
import { logOllyEvent } from 'utils/common';
import { getBuildPath } from 'utils/routeUtils';

import BuildCardDetails from './components/BuildCardDetails';
import BuildTableHeader from './components/BuildTableHeader';
import Filters from './components/Filters';
import FilterPills from './components/Filters/FilterPills';
import SearchBuilds from './components/SearchBuilds';
import {
  getAllAppliedFilters,
  getBuilds,
  getBuildsPagingParams,
  getIsLoadingFilters
} from './slices/buildsSelectors';
import {
  clearFilters,
  getBuildsData,
  getBuildsFiltersData
} from './slices/buildsSlice';
import { getFilterQueryParams } from './utils/common';

const AllBuildsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activeProject = useSelector(getActiveProject);
  const [updates, setUpdates] = useState();
  const builds = useSelector(getBuilds);
  const appliedFilters = useSelector(getAllAppliedFilters);
  const [isLoadingBuilds, setIsLoadingBuilds] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const isLoadingFilters = useSelector(getIsLoadingFilters);
  const pagingParams = useSelector(getBuildsPagingParams);

  const fetchBuilds = useCallback(() => {
    if (activeProject?.normalisedName && !isLoadingFilters) {
      setShowErrorToast(false);
      setIsLoadingBuilds(true);
      dispatch(
        getBuildsData({ projectNormalisedName: activeProject?.normalisedName })
      )
        .unwrap()
        .catch(() => {
          setShowErrorToast(true);
        })
        .finally(() => {
          setUpdates(0);
          window.scrollTo(0, 0);
          setIsLoadingBuilds(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    activeProject.normalisedName,
    appliedFilters,
    isLoadingFilters
  ]);

  useEffect(() => {
    if (activeProject?.normalisedName) {
      dispatch(
        getBuildsFiltersData({
          projectNormalisedName: activeProject?.normalisedName
        })
      );
    }
  }, [dispatch, activeProject.normalisedName]);

  useEffect(() => {
    fetchBuilds();
  }, [fetchBuilds]);

  useEffect(() => {
    logOllyEvent({
      event: 'O11yBuildListingVisited',
      data: {
        project_name: activeProject.name,
        project_id: activeProject.id,
        url: window.location.href
      }
    });
  }, [pathname, activeProject]);

  useEffect(() => {
    const unSubscribe = window.pubSub.subscribe(
      PUSHER_EVENTS.BUILD_STARTED,
      (data) => {
        if (activeProject?.normalisedName === data.projectNormalisedName) {
          setUpdates((prev) => prev + data.updatesCount);
        }
      }
    );
    return () => {
      unSubscribe();
    };
  }, [activeProject?.normalisedName]);

  useEffect(() => {
    navigate({ search: getFilterQueryParams(appliedFilters).toString() });
  }, [appliedFilters, navigate]);

  const loadMoreRows = () => {
    if (pagingParams?.hasNext) {
      setIsLoadingMore(true);
      dispatch(
        getBuildsData({
          projectNormalisedName: activeProject?.normalisedName,
          newPage: true,
          currentPagingParams: pagingParams
        })
      )
        .unwrap()
        .finally(() => {
          setIsLoadingMore(false);
        });
    }
  };

  const isBuildsEmpty = useMemo(
    () =>
      !builds?.length &&
      !showErrorToast &&
      !isLoadingBuilds &&
      !isLoadingFilters,
    [builds?.length, isLoadingBuilds, isLoadingFilters, showErrorToast]
  );

  const isBuildLoading = useMemo(
    () => isLoadingBuilds || isLoadingFilters,
    [isLoadingBuilds, isLoadingFilters]
  );

  const handleClickBuildItem = (currentIdx) => {
    const build = builds[currentIdx];
    navigate(
      getBuildPath(
        activeProject?.normalisedName,
        build?.normalisedName,
        build?.buildNumber
      )
    );
  };

  const handleViewAll = () => {
    dispatch(clearFilters());
  };

  return (
    <div className="flex h-full flex-col">
      <div className="border-base-300 flex items-center justify-between border-b px-6 py-5">
        <h1 className="text-2xl font-bold leading-8">Build Runs</h1>
        {!!updates && (
          <O11yButton
            variant="rounded"
            icon={<MdOutlineRefresh className="text-sm" />}
            iconPlacement="end"
            size="extra-small"
            isIconOnlyButton={isLoadingBuilds}
            loading={isLoadingBuilds}
            onClick={fetchBuilds}
          >
            {updates} new build{updates > 1 ? 's' : ''}
          </O11yButton>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 pt-5">
        <div className="mb-2 flex justify-between">
          <SearchBuilds />
          <Filters />
        </div>

        <div className="mb-4">
          <FilterPills />
        </div>
        {showErrorToast && (
          <EmptyPage
            heading="Unable to fetch data"
            text="Something went wrong while fetching builds data"
          />
        )}
        {isBuildLoading ? (
          <O11yLoader loaderClass="self-center p-1 my-5" />
        ) : (
          <>
            {!!builds.length && (
              <VirtualisedTable
                data={builds}
                endReached={loadMoreRows}
                showFixedFooter={isLoadingMore}
                itemContent={(index, singleBuildData) => (
                  <BuildCardDetails
                    key={singleBuildData.uuid}
                    data={singleBuildData}
                  />
                )}
                fixedHeaderContent={BuildTableHeader}
                handleRowClick={handleClickBuildItem}
                tableWrapperClassName="border-l border-r border-base-300 bg-white shadow ring-1 ring-black/5 border-separate border-spacing-0 table-fixed"
                tableContainerWrapperClassName="border-none overflow-visible overflow-x-visible bg-transparent ring-0 shadow-none rounded-none"
              />
            )}
          </>
        )}
        {isBuildsEmpty && !isBuildLoading && (
          <div className="m-auto">
            <O11yEmptyState
              title="No matching results found"
              description="We couldn't find the results you were looking for."
              mainIcon={
                <MdSearchOff className="text-base-500 inline-block h-12 w-12" />
              }
              buttonProps={{
                children: 'View all builds',
                onClick: handleViewAll,
                size: 'default'
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBuildsPage;
