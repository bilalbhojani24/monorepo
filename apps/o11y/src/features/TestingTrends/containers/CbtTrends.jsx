import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import Chart from 'common/Chart';
import {
  COMMON_CHART_CONFIGS,
  COMMON_CHART_STYLES,
  SNP_PARAMS_MAPPING,
  TOOLTIP_STYLES
} from 'constants/common';
import { getTrendsData } from 'features/TestingTrends/slices/testingTrendsSlice';
import { getActiveProject } from 'globalSlice/selectors';
import isEmpty from 'lodash/isEmpty';
import { getBaseUrl, logOllyEvent } from 'utils/common';

import TrendStatesWrapper from '../components/TrendStatesWrapper';
import { getAllTTFilters } from '../slices/selectors';

function getFormattedTooltip(activeProject, filters) {
  const url = `${getBaseUrl()}:8081/projects/${
    activeProject?.normalisedName
  }/suite_health?${SNP_PARAMS_MAPPING.snpActiveBuild}=${
    filters.buildName.value
  }&${SNP_PARAMS_MAPPING.snpDateRange}=${filters.dateRange.key}`;

  let returnString = `<div class="flex-1 "><span>${this.point.name}</span>`;
  returnString += `<div class="flex justify-between mt-1">
  <div><span style="color:${this.point.series.color}" class="font-sm">\u25CF&nbsp;</span>`;
  returnString += `<span>${this.point.series.name}</span> <span><b>${this.point.y}</b></span></div></div>`;

  return `<div class="px-2 py-1 flex flex-col bg-base-800 rounded-lg text-base-200">${returnString}
  <a class="text-white font-medium mt-0.5" href=${url} target="_blank">View tests (Pro)</a></div>`;
}

const getChartOptions = (activeProject, filters) => ({
  ...COMMON_CHART_CONFIGS,
  tooltip: {
    ...TOOLTIP_STYLES,
    formatter() {
      return getFormattedTooltip.call(this, activeProject, filters);
    },
    shared: true,
    useHTML: true,
    hideDelay: 1000
  },
  legend: { enabled: false },
  title: {
    verticalAlign: 'middle',
    useHTML: true
  },
  plotOptions: {
    series: {
      animation: false,
      pointWidth: 24
    },
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: false
      },
      center: ['50%', '50%'],
      size: '100%'
    }
  }
});

const getPreparedChartData = (data = []) => {
  const chartData = [];
  data?.forEach((item) => {
    chartData.push({
      ...item,
      y: item.value,
      sliced: true
    });
  });
  return chartData;
};

export default function CbtTrends() {
  const filters = useSelector(getAllTTFilters);
  const [chartData, setChartData] = useState({ data: [] });
  const dispatch = useDispatch();
  const activeProject = useSelector(getActiveProject);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [activeSeriesData, setActiveSeriesData] = useState([]);

  const chart = useRef(null);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
    setChartData({ data: [] });
    dispatch(
      getTrendsData({
        normalisedName: activeProject?.normalisedName,
        filters,
        key: 'cbt'
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
  }, [dispatch, activeProject?.normalisedName, filters]);

  useEffect(() => {
    if (activeProject?.normalisedName) {
      fetchData();
    }
  }, [fetchData, activeProject?.normalisedName]);

  const setChartTitle = useCallback((totalCombinations, chartRef) => {
    const currentChart = chartRef || chart.current?.chart;
    if (currentChart) {
      currentChart.setTitle({
        text: `<p class="text-5xl text-center">${totalCombinations}</p><p class="text-base font-medium">Combinations</p>`
      });
    }
  }, []);

  const getOptions = useMemo(
    () => ({
      ...getChartOptions(activeProject, filters),
      chart: {
        type: 'pie',
        ...COMMON_CHART_STYLES,
        events: {
          load(e) {
            setChartTitle(chartData.data.length, e.target);
            setActiveSeriesData(chartData.data);
          },
          drilldown(e) {
            const data = e?.seriesOptions?.data || [];
            if (data.length) {
              setChartTitle(data.length || 0, e.target);
              setActiveSeriesData(data);
              logOllyEvent({
                event: 'O11yTestingTrendsInteracted',
                data: {
                  project_name: activeProject.name,
                  project_id: activeProject.id,
                  interaction: 'cbt_drilldown'
                }
              });
            }
          },
          drillup(e) {
            const data = e?.seriesOptions?.data || [];
            if (data.length) {
              setChartTitle(data.length || 0, e.target);
              setActiveSeriesData(data);
            }
          }
        }
      },
      series: [
        {
          name: 'CBT',
          colorByPoint: true,
          borderWidth: 9,
          borderColor: null,
          slicedOffset: 0,
          innerSize: '98%',
          ignoreHiddenPoint: false,
          data: getPreparedChartData(chartData?.data || [])
        }
      ],
      drilldown: {
        series: chartData?.drillDownData?.map((item) => ({
          ...item,
          colorByPoint: true,
          borderWidth: 9,
          borderColor: null,
          slicedOffset: 0,
          innerSize: '98%',
          ignoreHiddenPoint: false,
          data: getPreparedChartData(item?.data || [])
        }))
      }
    }),
    [
      activeProject,
      filters,
      chartData.data,
      chartData?.drillDownData,
      setChartTitle
    ]
  );

  const handleDrillDown = (item, idx) => {
    if (item?.drilldown) {
      chart.current?.chart?.series[0]?.points?.[idx]?.doDrilldown(false);
    }
  };

  return (
    <TrendStatesWrapper
      isLoading={isLoading}
      isEmpty={
        isEmpty(chartData?.data) &&
        isEmpty(chartData?.drillDownData) &&
        !isLoading
      }
      hasError={hasError}
      onClickCTA={fetchData}
    >
      {!isLoading && (
        // eslint-disable-next-line tailwindcss/no-arbitrary-value
        <div className="grid h-[90%] flex-1 grid-cols-2 gap-1 overflow-hidden">
          {!!chartData.data?.length && (
            <Chart options={getOptions} chartRef={chart} />
          )}
          <div className="h-full overflow-y-auto p-3">
            {activeSeriesData.map((item, idx) => (
              <div
                className={classNames(
                  `w-full flex flex-1 justify-between items-center
                  px-2 py-1 text-sm text-left gap-2 text-base-900
                  border-b border-base-200 last:border-b-0`
                )}
                key={item.name}
                role="button"
                tabIndex={0}
                onKeyDown={() => {
                  handleDrillDown(item, idx);
                }}
                onClick={() => {
                  handleDrillDown(item, idx);
                }}
              >
                <p className="flex items-center">
                  <span
                    className="mr-2 mt-1 inline-block h-2 w-2 shrink-0 rounded"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="break-normal">{item.name}</span>
                </p>
                <p className="shrink-0 font-medium">{item.percentage}%</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </TrendStatesWrapper>
  );
}
