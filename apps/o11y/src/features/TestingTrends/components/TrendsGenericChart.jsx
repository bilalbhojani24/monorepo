import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { O11yTooltip } from 'common/bifrostProxy';
import Chart from 'common/Chart';
import { COMMON_CHART_STYLES } from 'constants/common';
import useChartActions from 'features/TestingTrends/hooks/useChartActions';
import {
  getAllTTFilters,
  getTTFilterByKey
} from 'features/TestingTrends/slices/selectors';
import { getCommonChartOptions } from 'features/TestingTrends/utils/utils';
import { getActiveProject } from 'globalSlice/selectors';
import PropTypes from 'prop-types';

import CustomChartTooltip from './CustomChartTooltip';

const P10_ID = 'Overall Stability';

export default function TrendsGenericChart({
  data,
  config,
  chartType,
  seriesOptions,
  buildName
}) {
  const { afterSetExtremes } = useChartActions(config?.analyticsKey || '');
  const filters = useSelector(getAllTTFilters);
  const activeProject = useSelector(getActiveProject);
  const activeDateRange = useSelector((state) =>
    getTTFilterByKey(state, 'dateRange')
  );

  const [tooltipData, setTooltipData] = useState({});

  const handleTooltipData = useCallback((tooltipRes) => {
    setTooltipData(tooltipRes);
  }, []);

  const chartData = getCommonChartOptions({
    afterSetExtremes,
    ...config,
    activeProject,
    filters,
    seriesOptions
  });

  const options = useMemo(() => {
    const chartOptions = {
      ...chartData,
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
      tooltip: {
        enabled: false,
        shared: true
      },
      plotOptions: {
        trendline: { ...chartData.plotOptions.trendline },
        series: {
          point: {
            events: {
              mouseOver(e) {
                const {
                  plotX,
                  plotY,
                  pointRange: pointRangeOptions,
                  index
                } = e.target;

                const seriesData = e.target.series.chart.series.map((res) => ({
                  ...res,
                  fixedToTwoDigits: config?.fixedToTwoDigits,
                  index,
                  pointRangeOptions,
                  totalTest: res.data[index]?.t,
                  y: res.data[index]?.y
                }));

                const { plotBox } = e.target.series.chart;
                const { spacingBox } = e.target.series.chart;

                handleTooltipData({
                  options: [...seriesData],
                  id: seriesOptions.id,
                  styles: {
                    top: plotY + plotBox.y - spacingBox.y,
                    left: plotX + plotBox.x - spacingBox.x,
                    width: 16,
                    height: 16
                  },
                  buildName
                });
              }
            }
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
          animation: false,
          connectNulls: true
        }
      ]
    };
    if (config?.hideLegends) {
      chartOptions.legend = { enabled: false };
    }
    if (config.showTrendLine) {
      chartOptions.series.push({
        name: 'Trendline',
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
  }, [
    buildName,
    chartData,
    chartType,
    config?.fixedToTwoDigits,
    config?.hideLegends,
    config.median,
    config.showTrendLine,
    data,
    handleTooltipData,
    seriesOptions
  ]);

  return (
    <div className="relative h-full">
      <div
        className="absolute z-10 rounded-sm"
        key={tooltipData?.options?.id}
        style={{
          ...tooltipData?.styles
        }}
        onClick={() => {}}
        role="presentation"
      >
        <O11yTooltip
          theme="dark"
          wrapperClassName="py-2"
          placementSide="top"
          placementAlign="center"
          triggerAsChild
          content={
            <CustomChartTooltip
              activeProject={activeProject}
              filters={filters}
              id={seriesOptions.id}
              tooltipData={tooltipData.options || []}
              buildName={buildName}
            />
          }
        >
          <div
            className="h-full w-full"
            style={{
              ...tooltipData?.styles
            }}
          />
        </O11yTooltip>
      </div>
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
    hideLegends: PropTypes.bool,
    analyticsKey: PropTypes.string,
    pointClickCb: PropTypes.func
  }),
  seriesOptions: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  }).isRequired,
  chartType: PropTypes.string,
  buildName: PropTypes.string
};

TrendsGenericChart.defaultProps = {
  chartType: 'spline',
  config: {
    median: null,
    showTrendLine: false,
    tooltipFormatter: null,
    fixedToTwoDigits: false,
    hideLegends: false,
    analyticsKey: '',
    pointClickCb: () => {}
  },
  buildName: ''
};
