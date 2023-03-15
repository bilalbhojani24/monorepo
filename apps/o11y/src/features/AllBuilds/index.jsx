import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { O11yTableCell, O11yTableRow } from 'common/bifrostProxy';
import EmptyPage from 'common/EmptyPage';
import VirtualisedTable from 'common/VirtualisedTable';
import { API_STATUSES } from 'constants/common';

import BuildCardDetails from './components/BuildCardDetails';
import { getBuildsData, setBuilds } from './slices/dataSlice';
import {
  getBuilds,
  getBuildsApiState,
  getBuildsPagingParams
} from './slices/selectors';

const AllBuildsPage = () => {
  const dispatch = useDispatch();
  const { projectNormalisedName } = useParams();
  const buildsData = useSelector(getBuilds);
  const buildsPagingParamsData = useSelector(getBuildsPagingParams);
  const { status: buildsApiStatus } = useSelector(getBuildsApiState);

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
      dispatch(setBuilds({ builds: [] }));
    };
  }, [dispatch, projectNormalisedName]);

  return (
    <div className="flex h-full flex-col">
      <div className="border-base-300 border-b px-8 py-5">
        <h1 className="text-2xl font-bold leading-6">All builds</h1>
      </div>

      <div className="flex flex-1 flex-col py-6 px-8">
        {buildsApiStatus === API_STATUSES.FAILED && (
          <EmptyPage
            heading="Unable to fetch data"
            text="Something went wrong while fetching builds data"
          />
        )}
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
