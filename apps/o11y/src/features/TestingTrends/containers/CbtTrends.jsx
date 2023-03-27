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
  TOOLTIP_STYLES
} from 'constants/common';
import { getTrendsData } from 'features/TestingTrends/slices/testingTrendsSlice';
import { getProjects } from 'globalSlice/selectors';
import { isEmpty } from 'lodash';
import { logOllyEvent } from 'utils/common';

import TrendStatesWrapper from '../components/TrendStatesWrapper';
import { getAllTTFilters } from '../slices/selectors';

const getChartOptions = () => ({
  ...COMMON_CHART_CONFIGS,
  tooltip: {
    ...TOOLTIP_STYLES
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
  const projects = useSelector(getProjects);
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
        normalisedName: projects.active?.normalisedName,
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
  }, [dispatch, projects.active?.normalisedName, filters]);

  useEffect(() => {
    if (projects.active?.normalisedName) {
      fetchData();
    }
  }, [fetchData, projects.active?.normalisedName]);

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
      ...getChartOptions(),
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
                  project_name: projects.active.name,
                  project_id: projects.active.id,
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
      chartData.data,
      chartData?.drillDownData,
      projects.active.id,
      projects.active.name,
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
        <div className="flex h-full flex-col">
          <div className="grid h-96 flex-1 grid-cols-2 gap-1">
            {!!chartData.data?.length && (
              <Chart options={getOptions} chartRef={chart} />
            )}
            <div className="h-96 overflow-y-auto p-3">
              {activeSeriesData.map((item, idx) => (
                <div
                  className={classNames(
                    'w-full flex flex-1 justify-between items-center px-2 py-1 text-sm text-left gap-2 text-base-900 border-b border-base-200 last:border-b-0',
                    {
                      '[&:not(:last-child)]:border': !item.drilldown
                    }
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
                  <p className="flex items-start">
                    <span
                      className="mr-2 mt-1 inline-block h-2 w-2 rounded"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </p>
                  <p className="font-medium">{item.percentage}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </TrendStatesWrapper>
  );
}
