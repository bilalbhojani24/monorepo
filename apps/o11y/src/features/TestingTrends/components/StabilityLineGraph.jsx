import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Button, MdDragIndicator } from '@browserstack/bifrost';
import TrendsGenericChart from 'features/TestingTrends/components/TrendsGenericChart';
import TrendStatesWrapper from 'features/TestingTrends/components/TrendStatesWrapper';
import { getAllTTFilters } from 'features/TestingTrends/slices/selectors';
import { getTrendStabilityChartData } from 'features/TestingTrends/slices/testingTrendsSlice';
import { getProjects } from 'globalSlice/selectors';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';

export default function StabilityLineGraph({ buildId }) {
  const [chartData, setChartData] = useState({});
  const dispatch = useDispatch();
  const projects = useSelector(getProjects);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const filters = useSelector(getAllTTFilters);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
    dispatch(
      getTrendStabilityChartData({
        normalisedName: projects.active?.normalisedName,
        buildId,
        filters
      })
    )
      .unwrap()
      .then((res) => {
        setChartData(res);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [buildId, dispatch, projects.active?.normalisedName, filters]);

  useEffect(() => {
    if (projects.active?.normalisedName && buildId) {
      fetchData();
    }
  }, [buildId, fetchData, projects.active?.normalisedName]);

  return (
    <TrendStatesWrapper
      isLoading={isLoading}
      isEmpty={isEmpty(chartData?.data)}
      hasError={hasError}
      onClickCTA={fetchData}
      showTitle={false}
    >
      {/* <Button
        icon={<MdDragIndicator />}
        isIconOnlyButton
        size="small"
        wrapperClassName="ml-3"
      /> */}
      <div className="h-96">
        {!isEmpty(chartData.data) && (
          <TrendsGenericChart
            data={chartData.data}
            config={{
              median: chartData?.median,
              showTrendLine: true,
              fixedToTwoDigits: true
            }}
            seriesOptions={{
              id: 'stabilityChart',
              name: 'Stability'
            }}
          />
        )}
      </div>
    </TrendStatesWrapper>
  );
}

StabilityLineGraph.propTypes = {
  buildId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
StabilityLineGraph.defaultProps = {
  buildId: ''
};
