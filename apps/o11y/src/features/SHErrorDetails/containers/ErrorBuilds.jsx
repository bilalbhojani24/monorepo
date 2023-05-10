import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { twClassNames } from '@browserstack/utils';
import { O11yTableCell, O11yTableRow } from 'common/bifrostProxy';
import VirtualisedTable from 'common/VirtualisedTable';
import { showTestDetailsDrawer } from 'features/TestDetails/utils';
import { getActiveProject } from 'globalSlice/selectors';
import { logOllyEvent } from 'utils/common';

import BuildRow from '../components/BuildRow';
import {
  BUILDS_HEADER_COLUMN_STYLE_MAPPING,
  SH_UE_DETAILS_CUSTOM_SCROLL_PARENT_ID
} from '../constants';
import { getSnPErrorDetailsBuildsData } from '../slices/dataSlice';
import {
  getShowUEDetailsFor,
  getUECbtInfo,
  getUEChartBounds,
  getUEShowAllBuilds
} from '../slices/selectors';

export default function ErrorBuilds() {
  const dispatch = useDispatch();

  const activeProject = useSelector(getActiveProject);
  const { testId, errorId } = useSelector(getShowUEDetailsFor);
  const cbtInfo = useSelector(getUECbtInfo);
  const chartBounds = useSelector(getUEChartBounds);
  const showAllBuilds = useSelector(getUEShowAllBuilds);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [buildsData, setBuildsData] = useState({
    pagingParams: {},
    builds: []
  });
  const mounted = useRef(null);

  useEffect(() => {
    mounted.current = true;
    if (testId && errorId && activeProject?.normalisedName) {
      if (mounted.current) {
        setIsLoadingData(true);
      }
      dispatch(
        getSnPErrorDetailsBuildsData({
          normalisedName: activeProject?.normalisedName,
          testId,
          errorId,
          cbtInfo,
          chartBounds,
          showAllBuilds
        })
      )
        .unwrap()
        .then((res) => {
          if (mounted.current) {
            setBuildsData(res);
          }
        })
        .catch(() => {
          if (mounted.current) {
            setBuildsData({
              pagingParams: {},
              builds: []
            });
          }
        })
        .finally(() => {
          if (mounted.current) {
            setIsLoadingData(false);
          }
        });
    }
    return () => {
      mounted.current = false;
    };
  }, [
    dispatch,
    testId,
    activeProject?.normalisedName,
    cbtInfo,
    chartBounds,
    showAllBuilds,
    errorId
  ]);

  const loadMore = () => {
    if (!isLoadingMore && buildsData.pagingParams?.hasNext) {
      setIsLoadingMore(true);
      dispatch(
        getSnPErrorDetailsBuildsData({
          normalisedName: activeProject?.normalisedName,
          testId,
          errorId,
          cbtInfo,
          pagingParams: buildsData.pagingParams,
          chartBounds,
          showAllBuilds
        })
      )
        .unwrap()
        .then((res) =>
          setBuildsData({
            pagingParams: res.pagingParams,
            builds: [...buildsData.builds, ...res.builds]
          })
        )
        .finally(() => {
          setIsLoadingMore(false);
        });
    }
  };

  const handleRowClick = (rest) => {
    const activeData = buildsData?.builds[rest];
    if (activeData) {
      dispatch(showTestDetailsDrawer(activeData.id));

      logOllyEvent({
        event: 'O11ySuiteHealthErrorsTimelineInteracted',
        data: {
          project_name: activeProject.name,
          project_id: activeProject.id,
          interaction: 'test_details_opened'
        }
      });
    }
  };

  if ((!isLoadingData && !buildsData.builds.length) || isLoadingData) {
    return null;
  }

  return (
    <VirtualisedTable
      customScrollParent={document.getElementById(
        SH_UE_DETAILS_CUSTOM_SCROLL_PARENT_ID
      )}
      data={buildsData.builds}
      endReached={loadMore}
      fixedHeaderContent={() => (
        <O11yTableRow>
          {Object.keys(BUILDS_HEADER_COLUMN_STYLE_MAPPING).map((key) => (
            <O11yTableCell
              key={key}
              wrapperClassName={twClassNames(
                BUILDS_HEADER_COLUMN_STYLE_MAPPING[key].defaultClass,
                'bg-white -top-5'
              )}
              isSticky
            >
              <div className="text-xs font-medium uppercase leading-4">
                {BUILDS_HEADER_COLUMN_STYLE_MAPPING[key].name}
              </div>
            </O11yTableCell>
          ))}
        </O11yTableRow>
      )}
      itemContent={(index, buildData) => <BuildRow buildData={buildData} />}
      showFixedFooter={isLoadingMore}
      handleRowClick={handleRowClick}
      tableContainerWrapperClassName="bg-white ring-0 shadow-none border-0 rounded-none md:rounded-none overflow-visible overflow-x-visible"
      tableWrapperClassName="border-separate border-spacing-0 divide-y-0"
    />
  );
}
