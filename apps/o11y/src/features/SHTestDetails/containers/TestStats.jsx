import React, { useEffect, useRef, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useDispatch, useSelector } from 'react-redux';
import O11yLoader from 'common/O11yLoader';
import { getActiveProject } from 'globalSlice/selectors';
import isEmpty from 'lodash/isEmpty';
import { milliSecondsToTime } from 'utils/dateTime';

import StatsCard from '../components/StatsCard';
import { getSnPDetailsStatsData } from '../slices/dataSlice';
import { getShowSHTestsDetailsFor, getSnPCbtInfo } from '../slices/selectors';

const TestStats = () => {
  const dispatch = useDispatch();
  const activeProject = useSelector(getActiveProject);
  const testId = useSelector(getShowSHTestsDetailsFor);
  const cbtInfo = useSelector(getSnPCbtInfo);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [stats, setStats] = useState({});
  const mounted = useRef(null);

  useEffect(() => {
    mounted.current = true;
    if (testId && activeProject?.normalisedName) {
      if (mounted.current) {
        setIsLoadingData(true);
      }
      dispatch(
        getSnPDetailsStatsData({
          normalisedName: activeProject?.normalisedName,
          testId,
          cbtInfo
        })
      )
        .unwrap()
        .then((res) => {
          if (mounted.current) {
            setStats(res);
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
  }, [dispatch, testId, activeProject?.normalisedName, cbtInfo]);

  if (isLoadingData) {
    return <O11yLoader wrapperClassName="py-6" />;
  }
  if (!isLoadingData && isEmpty(stats)) {
    return <p className="py-5 text-center">No data found</p>;
  }

  return (
    <div className="flex flex-wrap gap-3 py-5">
      {stats?.failureOccurrence?.failed !== undefined && (
        <StatsCard
          title="Failure Occurrence"
          data={
            <>
              {stats.failureOccurrence?.failed ?? '-'}
              {stats.failureOccurrence?.total && (
                <span>/{stats.failureOccurrence?.total}</span>
              )}
            </>
          }
        />
      )}
      {stats?.reliability !== undefined && (
        <StatsCard title="Failure Rate" data={<>{stats.reliability || 0}%</>} />
      )}
      {stats?.duration !== undefined && (
        <StatsCard
          title="Avg. Duration"
          data={ReactHtmlParser(milliSecondsToTime(stats.duration, false))}
        />
      )}
    </div>
  );
};

TestStats.propTypes = {};

export default TestStats;
