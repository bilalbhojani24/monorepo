import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { twClassNames } from '@browserstack/utils';
import Chart from 'common/Chart';
import EmptyPage from 'common/EmptyPage';
import O11yLoader from 'common/O11yLoader';
import { TOOLTIP_STYLES } from 'constants/common';
import {
  setIsDetailsVisible,
  setShowDetailsFor
} from 'features/TestDetails/slices/uiSlice';
import { getActiveProject } from 'globalSlice/selectors';
import { isEmpty } from 'lodash';
import { logOllyEvent } from 'utils/common';
import { getCustomTimeStamp, milliSecondsToTime } from 'utils/dateTime';

import {
  getSnPDetailsTrendData,
  setSHTestDetailsChartBounds
} from '../slices/dataSlice';
import { getShowSnPDetailsFor, getSnPCbtInfo } from '../slices/selectors';

function getFormattedYAxisLabel() {
  return milliSecondsToTime(this.value);
}

function getFormattedTooltip() {
  return this.points.reduce(
    (s, data) => {
      let returnString = `${s}<br/><span>${
        data.series.name
      }: <b>${milliSecondsToTime(data.y)}</b></span>`;
      if (data?.point?.buildId) {
        returnString += `<br/><span>Build no.: <b>#${data?.point?.buildId}</b><span/>`;
      }
      if (data?.point?.buildName) {
        returnString += `<br/><span>Build name: <b>${data?.point?.buildName.substring(
          0,
          200
        )}</b></span>`;
      }
      return returnString;
    },
    `<span>${getCustomTimeStamp({
      dateString: this.x
    })}</span>`
  );
}

const CHART_DEFAULT_OPTION = {
  chart: {
    type: 'column',
    zoomType: 'x',
    panning: true,
    panKey: 'shift',
    style: {
      fontFamily: '"Inter", sans-serif'
    },
    resetZoomButton: {
      position: {
        x: 0,
        y: -10
      },
      theme: {
        fill: 'white',
        stroke: 'silver',
        r: 3,
        states: {
          hover: {
            fill: '#0067dd',
            style: {
              color: 'white'
            }
          }
        }
      }
    }
  },
  title: {
    text: null
  },
  exporting: {
    enabled: false
  },
  credits: {
    enabled: false
  },
  legend: {
    enabled: false
  },
  time: {
    timezoneOffset: new Date().getTimezoneOffset()
  },
  tooltip: {
    shared: true,
    useHTML: true,
    ...TOOLTIP_STYLES,
    style: {
      width: '250px',
      whiteSpace: 'normal',
      color: '#fff'
    },
    formatter() {
      return getFormattedTooltip.call(this);
    }
  },
  yAxis: {
    min: 0,
    labels: {
      formatter() {
        return getFormattedYAxisLabel.call(this);
      }
    },
    title: {
      text: null
    }
  }
};

export default function TestTrend() {
  const dispatch = useDispatch();
  const activeProject = useSelector(getActiveProject);
  const testId = useSelector(getShowSnPDetailsFor);
  const cbtInfo = useSelector(getSnPCbtInfo);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [trendData, setTrendData] = useState({});
  const navigate = useNavigate();
  const mounted = useRef(null);

  useEffect(() => {
    if (testId && activeProject?.normalisedName) {
      setIsLoadingData(true);
      dispatch(
        getSnPDetailsTrendData({
          normalisedName: activeProject?.normalisedName,
          testId,
          cbtInfo
        })
      )
        .unwrap()
        .then((res) => {
          if (mounted.current) {
            setTrendData(res);
          }
        })
        .finally(() => {
          if (mounted.current) {
            setIsLoadingData(false);
          }
        });
    }
  }, [dispatch, testId, activeProject?.normalisedName, cbtInfo]);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      dispatch(
        setSHTestDetailsChartBounds({
          lower: null,
          upper: null
        })
      );
    };
  }, [dispatch]);

  const afterSetExtremes = useCallback(
    (e) => {
      const lower = Math.round(e.min);
      const upper = Math.round(e.max);
      dispatch(
        setSHTestDetailsChartBounds({
          lower: trendData.keys[lower],
          upper: trendData.keys[upper]
        })
      );
      logOllyEvent({
        event: 'O11ySuiteHealthTestsTimelineInteracted',
        data: {
          project_name: activeProject.name,
          project_id: activeProject.id,
          interaction: 'zoom'
        }
      });
    },
    [activeProject.id, activeProject.name, dispatch, trendData.keys]
  );

  const handleClickChartItem = useCallback(
    ({ point: { options } }) => {
      dispatch(setShowDetailsFor(options?.id));
      dispatch(setIsDetailsVisible(true));
      const searchParams = new URLSearchParams(window?.location?.search);
      searchParams.set('details', options.id);
      navigate({ search: searchParams.toString() });
      logOllyEvent({
        event: 'O11ySuiteHealthTestsTimelineInteracted',
        data: {
          project_name: activeProject.name,
          project_id: activeProject.id,
          interaction: 'test_details_opened'
        }
      });
    },
    [activeProject.id, activeProject.name, dispatch, navigate]
  );

  const getChartOptions = useMemo(
    () => ({
      ...CHART_DEFAULT_OPTION,
      xAxis: {
        min: 0,
        categories: trendData.keys,
        labels: {
          enabled: false
        },
        events: {
          afterSetExtremes
        }
      },
      plotOptions: {
        series: {
          borderRadiusTopLeft: 3,
          borderRadiusTopRight: 3,
          boostThreshold: 1000,
          stacking: 'normal'
        },
        column: {
          stacking: 'normal',
          cursor: 'pointer',
          maxPointWidth: 12,
          events: {
            click(e) {
              handleClickChartItem(e);
            }
          }
        }
      },
      series: [
        {
          name: 'Duration',
          data: trendData.data
        }
      ]
    }),
    [afterSetExtremes, handleClickChartItem, trendData]
  );

  if (isLoadingData) {
    return <O11yLoader wrapperClassName="py-6" />;
  }

  if (isEmpty(trendData.data)) {
    return (
      <div className={twClassNames('flex items-center justify-center flex-1')}>
        <EmptyPage text="No data found" />
      </div>
    );
  }

  return (
    <div className="mb-0">
      <p className="text-base-900 mb-5 text-lg font-medium leading-6">
        Test duration across builds
      </p>
      <div className="h-40">
        <Chart options={getChartOptions} />
      </div>
    </div>
  );
}
