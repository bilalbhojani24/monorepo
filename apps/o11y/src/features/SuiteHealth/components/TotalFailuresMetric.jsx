import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stats } from '@browserstack/bifrost';
import O11yLoader from 'common/O11yLoader';
import { getActiveProject } from 'globalSlice/selectors';

import { getSnPTestsFailuresMetricsData } from '../slices/uiSlice';

const TotalFailuresMetric = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const activeProject = useSelector(getActiveProject);
  //   const [chartPoints, setChartPoints] = useState([]);
  const [metricInfo, setMetricInfo] = useState({});

  useEffect(() => {
    setIsLoading(true);
    dispatch(
      getSnPTestsFailuresMetricsData({
        normalisedName: activeProject?.normalisedName
      })
    )
      .unwrap()
      .then((res) => {
        // setChartPoints(res.data);
        setMetricInfo(res.insights);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [activeProject?.normalisedName, dispatch]);

  return (
    <div className="relative flex-1">
      {isLoading && (
        <O11yLoader wrapperClassName="absolute top-0 left-0 w-full h-full rounded-lg z-10 bg-base-200 opacity-50" />
      )}
      <Stats
        cardWrapperClassname=""
        option={{
          id: 5,
          name: 'Total Failures',
          stat: metricInfo.value,
          subText: metricInfo.meta,
          graph: <div className="mb-4 flex h-28 justify-between">Graph</div>,
          icon: null,
          previousStat: null,
          link: null,
          onClick: () => {}
        }}
        variant="graph_variant"
        wrapperClassName="w-full"
      />
    </div>
  );
};

export default memo(TotalFailuresMetric);
