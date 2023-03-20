import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'common/Chart';
import { COMMON_CHART_STYLES } from 'constants/common';
import useChartActions from 'features/TestingTrends/hooks/useChartActions';
import { getTTFilterByKey } from 'features/TestingTrends/slices/selectors';
import { getCommonChartOptions } from 'features/TestingTrends/utils/utils';
import PropTypes from 'prop-types';

const P10_ID = 'Overall Stability';

export default function TrendsGenericChart({
  data,
  config,
  chartType,
  seriesOptions
}) {
  const { afterSetExtremes } = useChartActions();
  const activeDateRange = useSelector((state) =>
    getTTFilterByKey(state, 'dateRange')
  );
  const options = useMemo(() => {
    const chartOptions = {
      ...getCommonChartOptions({ afterSetExtremes, ...config }),
      chart: {
        animation: false,
        type: chartType,
        zoomType: 'x',
        ...COMMON_CHART_STYLES,
        events: {
          render(e) {
            e?.target?.series?.[0]?.chart?.resetZoomButton?.hide();
          }
        }
      },
      series: [
        {
          data,
          ...seriesOptions,
          borderRadiusTopLeft: 3,
          borderRadiusTopRight: 3,
          boostThreshold: 1000,
          stacking: 'normal',
          cropThreshold: 10000,
          animation: false
        }
      ]
    };
    if (config?.hideLegends) {
      chartOptions.legend = { enabled: false };
    }
    if (config.showTrendLine) {
      chartOptions.series.push({
        name: 'Trend',
        type: 'trendline',
        linkedTo: seriesOptions.id
      });
    }
    if (config.median) {
      chartOptions.series.push({
        id: P10_ID,
        color: '#D65444',
        name: P10_ID,
        dashStyle: 'Dash',
        marker: {
          enabled: false
        }
      });
    }
    return chartOptions;
  }, [afterSetExtremes, chartType, config, data, seriesOptions]);

  return (
    <div className="h-full">
      <Chart
        options={options}
        key={`${activeDateRange?.key}-${activeDateRange?.upperBound}-${activeDateRange?.lowerBound}`}
      />
    </div>
  );
}

TrendsGenericChart.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  config: PropTypes.shape({
    median: PropTypes.number,
    showTrendLine: PropTypes.bool,
    tooltipFormatter: PropTypes.func,
    fixedToTwoDigits: PropTypes.bool,
    hideLegends: PropTypes.bool
  }),
  seriesOptions: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  }).isRequired,
  chartType: PropTypes.string
};

TrendsGenericChart.defaultProps = {
  chartType: 'spline',
  config: {
    median: null,
    showTrendLine: false,
    tooltipFormatter: null,
    fixedToTwoDigits: false,
    hideLegends: false
  }
};
