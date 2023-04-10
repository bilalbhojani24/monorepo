import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { twClassNames } from '@browserstack/utils';
import TrendsGenericChart from 'features/TestingTrends/components/TrendsGenericChart';
import TrendStatesWrapper from 'features/TestingTrends/components/TrendStatesWrapper';
import { getAllTTFilters } from 'features/TestingTrends/slices/selectors';
import { getTrendsData } from 'features/TestingTrends/slices/testingTrendsSlice';
import { getActiveProject } from 'globalSlice/selectors';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { abbrNumber } from 'utils/common';

export default function TrendsCard({
  insightsSuffix,
  apiKey,
  config,
  chartType,
  seriesOptions
}) {
  const filters = useSelector(getAllTTFilters);
  const [chartData, setChartData] = useState({ data: {} });
  const dispatch = useDispatch();
  const activeProject = useSelector(getActiveProject);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
    dispatch(
      getTrendsData({
        normalisedName: activeProject?.normalisedName,
        filters,
        key: apiKey
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
  }, [dispatch, activeProject?.normalisedName, filters, apiKey]);

  useEffect(() => {
    if (activeProject?.normalisedName) {
      fetchData();
    }
  }, [fetchData, activeProject?.normalisedName]);
  return (
    <TrendStatesWrapper
      isLoading={isLoading}
      isEmpty={isEmpty(chartData?.data) && !isLoading}
      hasError={hasError}
      onClickCTA={fetchData}
    >
      {!isLoading && (
        <div className="flex h-full flex-col">
          {!isEmpty(chartData.insights) && (
            <div className="flex flex-col">
              {chartData?.insights?.count !== undefined && (
                <>
                  <p className="text-base-500 text-sm font-medium">Total</p>
                  <div className="flex">
                    <p className="pr-2 pb-0 text-3xl font-semibold">
                      {config?.abbrNumber
                        ? abbrNumber(chartData?.insights?.count)
                        : chartData?.insights?.count}
                      {insightsSuffix}
                    </p>
                    {(!!chartData?.insights?.meta || !!config.metaText) && (
                      <p className="text-base-500 self-end pb-1 text-sm font-medium">
                        {chartData?.insights?.meta || config.metaText}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
          {!isEmpty(chartData.data) && (
            <div className={twClassNames('pt-2 pb-2 h-full')}>
              <TrendsGenericChart
                data={chartData.data}
                config={config}
                chartType={chartType}
                seriesOptions={seriesOptions}
              />
            </div>
          )}
        </div>
      )}
    </TrendStatesWrapper>
  );
}

TrendsCard.propTypes = {
  apiKey: PropTypes.string.isRequired,
  insightsSuffix: PropTypes.string,
  config: PropTypes.shape({
    median: PropTypes.number,
    showTrendLine: PropTypes.bool,
    tooltipFormatter: PropTypes.func,
    fixedToTwoDigits: PropTypes.bool,
    abbrNumber: PropTypes.bool,
    metaText: PropTypes.string
  }),
  seriesOptions: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  }).isRequired,
  chartType: PropTypes.string
};

TrendsCard.defaultProps = {
  insightsSuffix: '',
  chartType: 'spline',
  config: {
    median: null,
    showTrendLine: false,
    tooltipFormatter: null,
    fixedToTwoDigits: false,
    abbrNumber: false,
    metaText: ''
  }
};
