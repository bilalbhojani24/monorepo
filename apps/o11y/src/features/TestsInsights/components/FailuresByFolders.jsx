/* eslint-disable tailwindcss/no-custom-classname */
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdBarChart, MdErrorOutline } from '@browserstack/bifrost';
import { O11yEmptyState, O11yTooltip } from 'common/bifrostProxy';
import Chart from 'common/Chart/containers/Chart';
import O11yLoader from 'common/O11yLoader';
// import PlaceHolder from 'testops/components/PlaceHolder';
// import TestopsTooltip from 'testops/components/TestopsTooltip';
import { COMMON_CHART_CONFIGS, COMMON_CHART_STYLES } from 'constants/common';
import { getBuildUUID } from 'features/BuildDetails/slices/selectors';
import { TestInsightsContext } from 'features/TestsInsights/TestInsightsContext';
import { isEmpty } from 'lodash';

import { getFailureByModules } from '../slices/selectors';
import { getFailureByModulesData } from '../slices/testInsightsSlice';

import FailureByFoldersTooltip from './FailureByFoldersTooltip';

// import CardHeader from '../widgets/CardHeader';
// import '../styles/FailuresByFolders.scss';

const getChartOptions = () => ({
  ...COMMON_CHART_CONFIGS,
  tooltip: {
    enabled: false
  },
  legend: {
    symbolHeight: 8,
    align: 'left',
    verticalAlign: 'top',
    x: 0
  },
  colorAxis: {
    reversed: true,
    min: 0,
    max: 100,
    stops: [
      [0, '#C1FFE4'],
      [0.001, '#FFF5F6'],
      [0.46, '#FFA0A8'],
      [1, '#FC5F6C']
    ],
    labels: {
      overflow: 'allow',
      format: '{text}%',
      align: 'left'
    }
  }
});

export default function FailuresByFolders() {
  const { logInsightsInteractionEvent } = useContext(TestInsightsContext);

  const buildId = useSelector(getBuildUUID);
  const failureByModules = useSelector(getFailureByModules);
  const [tooltipData, setTooltipData] = useState({});
  const containerRef = useRef(null);
  const [series, setSeries] = useState({});

  const dispatch = useDispatch();

  const handleTooltipData = useCallback((data) => {
    setTooltipData(data);
  }, []);

  useEffect(() => {
    dispatch(getFailureByModulesData({ buildId }));
  }, [buildId, dispatch]);

  const updatePoints = useCallback((argSeries) => {
    if (!isEmpty(argSeries)) {
      const { points } = argSeries;
      points.forEach((point) => {
        if (point.shapeArgs.height < 30) {
          point?.dataLabel?.hide();
        }
      });
    }
  }, []);

  const chartOptions = useMemo(
    () => ({
      ...getChartOptions(),
      chart: {
        ...COMMON_CHART_STYLES,
        spacingLeft: 0,
        spacingRight: 0,
        animation: false,
        events: {
          load: (e) => {
            setSeries(e?.target?.series?.[0]);
          },
          render(e) {
            updatePoints(e?.target?.series?.[0]);
          }
        }
      },
      plotOptions: {
        series: {
          animation: false,
          point: {
            events: {
              mouseOver(e) {
                const {
                  series: {
                    chart: { plotBox }
                  },
                  options,
                  drillId,
                  color,
                  shapeArgs,
                  category
                } = e.target;
                handleTooltipData({
                  options: { ...options, drillId, color },
                  category,
                  styles: {
                    top: shapeArgs.y + plotBox.y,
                    left: shapeArgs.x + 20,
                    width: shapeArgs.width,
                    height: shapeArgs.height
                  }
                });
              }
            }
          }
        }
      },
      series: [
        {
          name: 'Top',
          type: 'treemap',
          allowTraversingTree: true,
          opacity: 1,
          borderRadius: 8,
          borderWidth: 8,
          borderColor: 'white',
          layoutAlgorithm: 'squarified',
          dataLabels: {
            enabled: false
          },
          levelIsConstant: false,
          levels: [
            {
              level: 1,
              dataLabels: {
                enabled: true,
                useHTML: true,
                align: 'center',
                verticalAlign: 'middle',
                formatter() {
                  return `<div class="ti-fbm__data-label">
                    </div>`;
                }
              }
            }
            // ${
            //   this?.point?.options?.type === 'FOLDER'
            //     ? `<svg class="ti-fbm__data-label-icon">
            //   <path d="M16.6667 4.99999H9.99999L8.33332 3.33333H3.33332C2.41666 3.33333 1.67499 4.08333 1.67499 4.99999L1.66666 15C1.66666 15.9167 2.41666 16.6667 3.33332 16.6667H16.6667C17.5833 16.6667 18.3333 15.9167 18.3333 15V6.66666C18.3333 5.74999 17.5833 4.99999 16.6667 4.99999ZM16.6667 15H3.33332V6.66666H16.6667V15Z" fill="#333333"/>
            //   </svg>`
            //     : `<svg width="14" height="18">
            //     <path d="M8.66671 0.666664H2.00004C1.08337 0.666664 0.341708 1.41666 0.341708 2.33333L0.333374 15.6667C0.333374 16.5833 1.07504 17.3333 1.99171 17.3333H12C12.9167 17.3333 13.6667 16.5833 13.6667 15.6667V5.66666L8.66671 0.666664ZM2.00004 15.6667V2.33333H7.83337V6.5H12V15.6667H2.00004Z" fill="#333333"/>
            //     </svg>
            //   `
            // }
            // <p class="ti-fbm__data-label-text">${
            //   this?.point?.name
            // }</p>
          ],
          states: {
            hover: {
              opacity: 1,
              shadow: true,
              borderColor: 'white'
            }
          },
          breadcrumbs: {
            events: {
              click: () => {
                setTooltipData({});
              }
            }
          },
          data: failureByModules.data
        }
      ]
    }),
    [failureByModules.data, handleTooltipData, updatePoints]
  );

  const handleClickTooltipInit = () => {
    if (tooltipData?.options?.drillId) {
      logInsightsInteractionEvent({
        interaction: 'failure_by_folder_drill_down'
      });
      series?.setRootNode(tooltipData?.options?.drillId);
      setTooltipData({});
    }
  };

  useEffect(() => {
    const handleResize = () => {
      // adding a slight delay to allow highchart animation to finish
      setTimeout(() => {
        setTooltipData({});
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (failureByModules?.hasNetworkError) {
    return (
      <div className="ti-fbm">
        <O11yEmptyState
          title="Something went wrong"
          description={null}
          buttonProps={{
            children: 'Reload',
            onClick: () => dispatch(getFailureByModulesData({ buildId })),
            size: 'default'
          }}
          mainIcon={
            <MdErrorOutline className="text-danger-600 inline-block !h-12 !w-12" />
          }
        />
      </div>
    );
  }
  if (failureByModules?.isLoading) {
    return (
      <div className="ti-fbm ti-fbm--loading">
        <div className="ti-fbm__loading-spin">
          <O11yLoader text="Fetching data" />
        </div>
      </div>
    );
  }
  if (isEmpty(failureByModules?.data) && !failureByModules?.isLoading) {
    return (
      <div className="ti-fbm">
        <O11yEmptyState
          title="No data found"
          description={null}
          mainIcon={
            <MdBarChart className="text-base-400 inline-block !h-12 !w-12" />
          }
          buttonProps={null}
        />
      </div>
    );
  }

  return (
    <div className="ti-fbm" ref={containerRef}>
      {/* <CardHeader title="Failure by Folders" /> */}
      <div className="ti-fbm__chart">
        <O11yTooltip
          theme="dark"
          content={
            tooltipData?.options?.id ? (
              <FailureByFoldersTooltip data={tooltipData.options || {}} />
            ) : null
          }
        >
          <div
            className="ti-fbm__tooltip-init"
            key={tooltipData?.options?.id}
            style={{
              ...tooltipData?.styles,
              cursor: tooltipData?.options?.drillId ? 'pointer' : 'default'
            }}
            onClick={handleClickTooltipInit}
            role="presentation"
          />
        </O11yTooltip>
        <Chart options={chartOptions} />
      </div>
    </div>
  );
}
