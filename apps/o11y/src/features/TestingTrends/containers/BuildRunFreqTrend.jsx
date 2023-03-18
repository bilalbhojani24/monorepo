import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Virtuoso } from 'react-virtuoso';
import classNames from 'classnames';
import { getTrendBuildFrequencyData } from 'features/TestingTrends/slices/testingTrendsSlice';
import { getProjects } from 'globalSlice/selectors';
import { isEmpty, max } from 'lodash';
import PropTypes from 'prop-types';
import { abbrNumber } from 'utils/common';

import CardHeader from '../components/CardHeader';
import TrendStatesWrapper from '../components/TrendStatesWrapper';
import { getAllTTFilters } from '../slices/selectors';

const BuildRunsList = React.memo(({ handleBottomChange, builds }) => {
  const containerRef = useRef(null);
  const maxRunCount = max(builds?.data?.map(({ runs }) => runs));
  return (
    <div className="flex-1 pt-3 font-medium" ref={containerRef}>
      <Virtuoso
        customScrollParent={containerRef.current}
        data={[...builds?.data, { spacer: true }]}
        atBottomStateChange={handleBottomChange}
        itemContent={(idx, item) => {
          if (item.spacer) {
            return <div className="block h-3" />;
          }
          return (
            <div
              className={classNames('flex items-center py-1 px-0', {
                'bg-gray-10': idx % 2 !== 0
              })}
              key={item.id}
            >
              <div className="p-2">{item.buildName}</div>
              <div className="p-2">
                <div
                  className="mr-3 h-3 rounded-r-lg"
                  style={{ width: `${(item.runs / maxRunCount) * 100}%` }}
                />
                <p className="">{abbrNumber(item.runs)}</p>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
});

export default function BuildRunFreqTrend({ title }) {
  const filters = useSelector(getAllTTFilters);
  const [buildData, setBuildData] = useState({ data: [] });
  const dispatch = useDispatch();
  const projects = useSelector(getProjects);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

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

  return (
    <TrendStatesWrapper
      isLoading={isLoading}
      isEmpty={isEmpty(buildData?.data)}
      hasError={hasError}
      onClickCTA={fetchData}
      title={title}
    >
      <div className="flex h-full flex-col overflow-auto">
        <CardHeader title={title} />
        <div className="flex h-full flex-col overflow-auto py-0 px-3">
          <div className="flex items-center border bg-white pt-5 font-medium">
            <div className="p-2">Build Name</div>
            <div className="p-2">Runs</div>
          </div>
          <BuildRunsList
            handleBottomChange={handleBottomChange}
            builds={buildData}
          />
          {!isAtBottom && (
            <div className="absolute left-0 bottom-0 w-full py-2 text-center" />
          )}
        </div>
      </div>
    </TrendStatesWrapper>
  );
}

BuildRunsList.propTypes = {
  handleBottomChange: PropTypes.func.isRequired,
  builds: PropTypes.objectOf(PropTypes.any).isRequired
};

BuildRunFreqTrend.propTypes = {
  title: PropTypes.string.isRequired
};
