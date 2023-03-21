import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { O11yTableCell, O11yTableRow } from 'common/bifrostProxy';
import VirtualisedTable from 'common/VirtualisedTable';
import { getTrendBuildFrequencyData } from 'features/TestingTrends/slices/testingTrendsSlice';
import { getProjects } from 'globalSlice/selectors';
import { isEmpty, max } from 'lodash';
import PropTypes from 'prop-types';
import { abbrNumber } from 'utils/common';

import CardHeader from '../components/CardHeader';
import TrendStatesWrapper from '../components/TrendStatesWrapper';
import { getAllTTFilters } from '../slices/selectors';

const BuildRunsList = React.memo(({ item, maxRunCount }) => (
  <>
    <O11yTableCell>{item.buildName}</O11yTableCell>
    <O11yTableCell>
      <div className="flex">
        <div
          className="mr-3 h-3 rounded-r-lg"
          style={{
            width: `${(item.runs / maxRunCount) * 100}%`,
            backgroundColor: '#865CC1'
          }}
        />
        <p className="pl-2">{abbrNumber(item.runs)}</p>
      </div>
    </O11yTableCell>
  </>
));

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

  const containerRef = useRef(null);
  const maxRunCount = max(buildData?.data?.map(({ runs }) => runs));

  return (
    <TrendStatesWrapper
      isLoading={isLoading}
      isEmpty={isEmpty(buildData?.data)}
      hasError={hasError}
      onClickCTA={fetchData}
      title={title}
    >
      <CardHeader title={title} />
      <div className="h-96 flex-1 p-4">
        <VirtualisedTable
          data={buildData?.data}
          // endReached={loadMoreRows}
          showFixedFooter={isAtBottom}
          tableRowWrapperClassName="shadow-none"
          customScrollParent={containerRef.current}
          itemContent={(index, singleBuildData) => (
            <BuildRunsList item={singleBuildData} maxRunCount={maxRunCount} />
          )}
          fixedHeaderContent={() => (
            <O11yTableRow>
              <O11yTableCell>BUILD NAME</O11yTableCell>
              <O11yTableCell>RUNS</O11yTableCell>
            </O11yTableRow>
          )}
          handleRowClick={handleBottomChange}
        />
      </div>
    </TrendStatesWrapper>
  );
}

BuildRunsList.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  maxRunCount: PropTypes.number.isRequired
};

BuildRunFreqTrend.propTypes = {
  title: PropTypes.string.isRequired
};
