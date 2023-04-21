import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Virtuoso } from 'react-virtuoso';
import O11yLoader from 'common/O11yLoader';
import { getTrendUniqueBuildsData } from 'features/TestingTrends/slices/testingTrendsSlice';
import { getProjects } from 'globalSlice/selectors';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

import TrendStatesWrapper from '../components/TrendStatesWrapper';
import UniqueBuildItem from '../components/UniqueBuildItem';

const LoadingFooter = () => (
  <div className="flex items-center py-6 px-0">
    <O11yLoader />
  </div>
);

const UniqueBuildRunsList = React.memo(
  ({ handleBottomChange, builds, loadMoreRows, isLoadingMore }) => {
    const containerRef = useRef(null);
    return (
      <div className="min-h-0 flex-1 overflow-auto" ref={containerRef}>
        <Virtuoso
          overscan={0}
          endReached={loadMoreRows}
          data={[...builds?.data, { spacer: true }]}
          atBottomStateChange={handleBottomChange}
          itemContent={(index, item) => {
            if (item.spacer) {
              return <div className="block h-1" />;
            }
            return <UniqueBuildItem data={item} />;
          }}
          components={{
            Footer: isLoadingMore ? LoadingFooter : null
          }}
        />
      </div>
    );
  }
);

export default function UniqueBuildRuns() {
  const [builds, setBuilds] = useState({ data: [], pagingParams: {} });

  const dispatch = useDispatch();
  const projects = useSelector(getProjects);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const fetchData = useCallback(
    ({ newPage = false, currentPagingParams = {} }) => {
      if (projects.active?.normalisedName) {
        if (newPage) {
          setIsLoadingMore(true);
        } else {
          setIsLoading(true);
        }
        setHasError(false);
        dispatch(
          getTrendUniqueBuildsData({
            normalisedName: projects.active?.normalisedName,
            pagingParams: currentPagingParams
          })
        )
          .unwrap()
          .then((res) => {
            if (newPage) {
              setBuilds((prev) => ({
                ...res,
                data: [...prev.data, ...res.data]
              }));
            } else {
              setBuilds(res);
            }
          })
          .catch(() => {
            setHasError(true);
          })
          .finally(() => {
            setIsLoading(false);
            setIsLoadingMore(false);
          });
      }
    },
    [dispatch, projects.active?.normalisedName]
  );

  useEffect(() => {
    fetchData({});
  }, [fetchData]);

  const handleBottomChange = useCallback((state) => {
    setIsAtBottom(state);
  }, []);

  const loadMoreRows = () => {
    if (builds?.pagingParams?.hasNext && !isLoadingMore && !isLoading) {
      fetchData({
        newPage: true,
        currentPagingParams: builds.pagingParams
      });
    }
  };

  return (
    <TrendStatesWrapper
      isLoading={isLoading}
      isEmpty={isEmpty(builds?.data)}
      hasError={hasError}
      onClickCTA={() => fetchData({})}
    >
      {!isLoading && (
        <div className="relative flex h-full">
          {!!builds?.data?.length && (
            <UniqueBuildRunsList
              handleBottomChange={handleBottomChange}
              builds={builds}
              loadMoreRows={loadMoreRows}
              isLoadingMore={isLoadingMore}
            />
          )}
          {!isAtBottom && (
            <div className="absolute bottom-0 left-0 m-0 w-full py-2 px-0 text-center" />
          )}
        </div>
      )}
    </TrendStatesWrapper>
  );
}

UniqueBuildRunsList.propTypes = {
  handleBottomChange: PropTypes.func.isRequired,
  builds: PropTypes.objectOf(PropTypes.any).isRequired,
  loadMoreRows: PropTypes.func.isRequired,
  isLoadingMore: PropTypes.bool.isRequired
};
