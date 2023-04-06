import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TrendsGenericChart from 'features/TestingTrends/components/TrendsGenericChart';
import TrendStatesWrapper from 'features/TestingTrends/components/TrendStatesWrapper';
import { getAllTTFilters } from 'features/TestingTrends/slices/selectors';
import { getTrendStabilityChartData } from 'features/TestingTrends/slices/testingTrendsSlice';
import { getActiveProject } from 'globalSlice/selectors';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { logOllyEvent } from 'utils/common';

export default function StabilityLineGraph({ buildName }) {
  const [chartData, setChartData] = useState({});
  const dispatch = useDispatch();
  const activeProject = useSelector(getActiveProject);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const filters = useSelector(getAllTTFilters);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
    dispatch(
      getTrendStabilityChartData({
        normalisedName: activeProject?.normalisedName,
        buildName,
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
  }, [buildName, dispatch, activeProject?.normalisedName, filters]);

  useEffect(() => {
    if (activeProject?.normalisedName && buildName) {
      fetchData();
    }
  }, [buildName, fetchData, activeProject?.normalisedName]);

  return (
    <TrendStatesWrapper
      isLoading={isLoading}
      isEmpty={isEmpty(chartData?.data)}
      hasError={hasError}
      onClickCTA={fetchData}
    >
      {!isLoading && (
        <div className="h-96">
          {!isEmpty(chartData.data) && (
            <TrendsGenericChart
              data={chartData.data}
              config={{
                median: chartData?.median,
                showTrendLine: true,
                fixedToTwoDigits: true,
                pointClickCb: () =>
                  logOllyEvent({
                    event: 'O11yTestingTrendsInteracted',
                    data: {
                      project_name: activeProject.name,
                      project_id: activeProject.id,
                      interaction: 'stability_clicked'
                    }
                  })
              }}
              seriesOptions={{
                id: 'stabilityChart',
                name: 'Stability'
              }}
            />
          )}
        </div>
      )}
    </TrendStatesWrapper>
  );
}

StabilityLineGraph.propTypes = {
  buildName: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
StabilityLineGraph.defaultProps = {
  buildName: ''
};
