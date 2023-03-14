import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MdSearchOff } from '@browserstack/bifrost';
import { O11yButton, O11yTableCell, O11yTableRow } from 'common/bifrostProxy';
import EmptyPage from 'common/EmptyPage';
import O11yLoader from 'common/O11yLoader';
import VirtualisedTable from 'common/VirtualisedTable';
import { API_STATUSES } from 'constants/common';

import BuildCardDetails from './components/BuildCardDetails';
import SearchBuilds from './components/SearchBuilds';
import {
  getBuildsData,
  setAppliedFilters,
  setBuilds,
  setSelectedFilters
} from './slices/dataSlice';
import {
  getBuilds,
  getBuildsApiState,
  getBuildsPagingParams
} from './slices/selectors';
import { EMPTY_APPLIED_FILTERS, EMPTY_SELECTED_FILTERS } from './constants';

const AllBuildsPage = () => {
  const dispatch = useDispatch();
  const { projectNormalisedName } = useParams();
  const buildsData = useSelector(getBuilds);
  const buildsPagingParamsData = useSelector(getBuildsPagingParams);
  const { status: buildsApiStatus } = useSelector(getBuildsApiState);

  const viewAllBuilds = () => {
    // PRATIK_TODO : remove applied filters
  };
  const loadBuildsData = useCallback(() => {
    if (buildsPagingParamsData.hasNext) {
      dispatch(
        getBuildsData({
          projectNormalisedName,
          currentPagingParams: buildsPagingParamsData
        })
      );
    }
  }, [dispatch, buildsPagingParamsData, projectNormalisedName]);

  useEffect(() => {
    dispatch(
      getBuildsData({
        projectNormalisedName,
        currentPagingParams: {}
      })
    );
    return () => {
      // Clean builds on project change
      dispatch(setBuilds({ builds: [], buildsPagingParams: {} }));
      dispatch(setSelectedFilters(EMPTY_SELECTED_FILTERS));
      dispatch(setAppliedFilters(EMPTY_APPLIED_FILTERS));
    };
  }, [dispatch, projectNormalisedName]);

  return (
    <div className="flex h-full flex-col">
      <div className="border-base-300 border-b px-8 py-5">
        <h1 className="text-2xl font-bold leading-6">All builds</h1>
      </div>

      <div className="flex flex-1 flex-col py-6 px-8">
        <div className="pb-6">
          <SearchBuilds />
        </div>
        {buildsApiStatus === API_STATUSES.FAILED && (
          <EmptyPage
            heading="Unable to fetch data"
            text="Something went wrong while fetching builds data"
          />
        )}
        {buildsData.length === 0 && buildsApiStatus === API_STATUSES.PENDING ? (
          <O11yLoader loaderClass="text-base-600 h-9 w-9 self-center p-1 my-5" />
        ) : null}
        {buildsData.length === 0 &&
        buildsApiStatus === API_STATUSES.FULFILLED ? (
          <div className="m-auto">
            <MdSearchOff className="text-base-500 mx-auto h-11 w-11" />
            <h2 className="text-center font-bold">No matching results found</h2>
            <p className="text-base-500 text-center">
              We couldn&apos;t find the results you were looking for.
            </p>
            {/* PRATIK_TODO : show only when filters applied */}
            <O11yButton
              wrapperClassName="mx-auto mt-6 block"
              onClick={viewAllBuilds}
            >
              View All Builds
            </O11yButton>
          </div>
        ) : null}
        {!!buildsData.length && (
          <VirtualisedTable
            data={buildsData}
            endReached={loadBuildsData}
            showFixedFooter={buildsApiStatus === API_STATUSES.PENDING}
            itemContent={(index, singleBuildData) => (
              <BuildCardDetails
                key={singleBuildData.uuid}
                data={singleBuildData}
              />
            )}
            fixedHeaderContent={() => (
              <O11yTableRow>
                <O11yTableCell>BUILD</O11yTableCell>
                <O11yTableCell>TESTS</O11yTableCell>
                <O11yTableCell>DURATION</O11yTableCell>
                <O11yTableCell>FAILURE CATEGORIES</O11yTableCell>
                <O11yTableCell>SMART TAGS</O11yTableCell>
              </O11yTableRow>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default AllBuildsPage;
