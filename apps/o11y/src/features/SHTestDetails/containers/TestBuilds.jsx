import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TableVirtuoso } from 'react-virtuoso';
import { twClassNames } from '@browserstack/utils';
import {
  O11yRefTableBody,
  O11yTable,
  O11yTableCell,
  O11yTableRow
} from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
import { getActiveProject } from 'globalSlice/selectors';

import BuildRow from '../components/BuildRow';
import { BUILDS_HEADER_COLUMN_STYLE_MAPPING } from '../constants';
import { getSnPDetailsBuildsData } from '../slices/dataSlice';
import {
  getShowSnPDetailsFor,
  getSnPCbtInfo,
  getTestDetailsChartBounds
} from '../slices/selectors';

// eslint-disable-next-line react/jsx-props-no-spreading
const TableRow = (props) => <O11yTableRow {...props} hover />;
const VTable = (props) => (
  <O11yTable
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    style={{ borderCollapse: 'separate' }}
    containerWrapperClass="border border-solid border-base-200 rounded-lg"
  />
);

export default function TestBuilds() {
  const dispatch = useDispatch();
  const activeProject = useSelector(getActiveProject);
  const testId = useSelector(getShowSnPDetailsFor);
  const cbtInfo = useSelector(getSnPCbtInfo);
  const chartBounds = useSelector(getTestDetailsChartBounds);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [buildsData, setBuildsData] = useState({
    pagingParams: {},
    builds: []
  });
  const mounted = useRef(null);

  useEffect(() => {
    mounted.current = true;
    if (testId && activeProject?.normalisedName) {
      if (mounted.current) {
        setIsLoadingData(true);
      }
      dispatch(
        getSnPDetailsBuildsData({
          normalisedName: activeProject?.normalisedName,
          testId,
          cbtInfo,
          chartBounds
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
  }, [dispatch, testId, activeProject?.normalisedName, cbtInfo, chartBounds]);

  const loadMore = () => {
    if (!isLoadingMore && buildsData.pagingParams?.hasNext) {
      setIsLoadingMore(true);
      dispatch(
        getSnPDetailsBuildsData({
          normalisedName: activeProject?.normalisedName,
          testId,
          cbtInfo,
          pagingParams: buildsData.pagingParams,
          chartBounds
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

  if (!buildsData.builds.length) {
    return null;
  }

  return (
    <div className={twClassNames('flex-1')}>
      {isLoadingData ? (
        <O11yLoader
          wrapperClassName="h-full"
          loaderClass="text-base-200 fill-base-400 w-8 h-8"
        />
      ) : (
        <TableVirtuoso
          style={{ height: '100%' }}
          data={buildsData.builds}
          endReached={loadMore}
          components={{
            Table: VTable,
            TableRow,
            TableBody: O11yRefTableBody
          }}
          fixedHeaderContent={() => (
            <TableRow>
              {Object.keys(BUILDS_HEADER_COLUMN_STYLE_MAPPING).map((key) => (
                <O11yTableCell
                  key={key}
                  wrapperClassName={twClassNames(
                    BUILDS_HEADER_COLUMN_STYLE_MAPPING[key].defaultClass
                  )}
                >
                  <div className="text-xs font-medium leading-4">
                    {BUILDS_HEADER_COLUMN_STYLE_MAPPING[key].name}
                  </div>
                </O11yTableCell>
              ))}
            </TableRow>
          )}
          itemContent={(index, buildData) => <BuildRow buildData={buildData} />}
        />
      )}
    </div>
  );
}
