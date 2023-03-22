import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { twClassNames } from '@browserstack/utils';
import CardHeader from 'features/TestingTrends/components/CardHeader';
import TrendsGenericChart from 'features/TestingTrends/components/TrendsGenericChart';
import TrendStatesWrapper from 'features/TestingTrends/components/TrendStatesWrapper';
import { TREND_CARDS } from 'features/TestingTrends/constants';
import { getAllTTFilters } from 'features/TestingTrends/slices/selectors';
import { getTrendsData } from 'features/TestingTrends/slices/testingTrendsSlice';
import { getProjects } from 'globalSlice/selectors';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { abbrNumber } from 'utils/common';

export default function TrendsCard({
  cardKey,
  insightsSuffix,
  apiKey,
  config,
  chartType,
  seriesOptions
}) {
  const filters = useSelector(getAllTTFilters);
  const [chartData, setChartData] = useState({ data: {} });
  const dispatch = useDispatch();
  const projects = useSelector(getProjects);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
    dispatch(
      getTrendsData({
        normalisedName: projects.active?.normalisedName,
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
  }, [dispatch, projects.active?.normalisedName, filters, apiKey]);

  useEffect(() => {
    if (projects.active?.normalisedName) {
      fetchData();
    }
  }, [fetchData, projects.active?.normalisedName]);
  return (
    <TrendStatesWrapper
      isLoading={isLoading}
      isEmpty={isEmpty(chartData?.data) && !isLoading}
      hasError={hasError}
      onClickCTA={fetchData}
      title={TREND_CARDS[cardKey].title}
    >
      <div className="flex flex-col">
        <CardHeader title={TREND_CARDS[cardKey].title} />
        {!isEmpty(chartData.insights) && (
          <div className="flex items-end gap-4 px-5 pt-2">
            {chartData?.insights?.count !== undefined && (
              <>
                <p className="px-5 pt-2 pb-0 text-3xl font-semibold">
                  {config?.abbrNumber
                    ? abbrNumber(chartData?.insights?.count)
                    : chartData?.insights?.count}
                  {insightsSuffix}
                </p>
                {(!!chartData?.insights?.meta || !!config.metaText) && (
                  <p className="pb-1">
                    {chartData?.insights?.meta || config.metaText}
                  </p>
                )}
              </>
            )}
          </div>
        )}
        {!isEmpty(chartData.data) && (
          <div className={twClassNames('px-5 pt-2 pb-2 h-80')}>
            <TrendsGenericChart
              data={chartData.data}
              config={config}
              chartType={chartType}
              seriesOptions={seriesOptions}
            />
          </div>
        )}
      </div>
    </TrendStatesWrapper>
  );
}

TrendsCard.propTypes = {
  cardKey: PropTypes.string.isRequired,
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
