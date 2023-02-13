import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Highcharts from 'highcharts';

import { CHART_OPTIONS } from '../const/immutableConst';
import { setAllTestRuns, setMetaPage } from '../slices/testRunsSlice';

const useTestRuns = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();

  const isTestRunsLoading = useSelector(
    (state) => state.testRuns.isLoading.testRuns
  );
  const metaPage = useSelector((state) => state.testRuns.metaPage);
  const allTestRuns = useSelector((state) => state.testRuns.allTestRuns);
  const currentTab = useSelector((state) => state.testRuns.currentTab);

  const isAddTestRunsFormVisible = useSelector(
    (state) => state.testRuns.isVisible.addTestRunsForm
  );

  const chartToolTipFormatter = (obj) => {
    debugger;
    console.log(this);
    return `in year`;
  };

  const getOptions = (data) => {
    if (!data?.overall_progress) return CHART_OPTIONS;

    const totalValue = Object.values(data.overall_progress).reduce(
      (total, num) => total + num,
      0
    );

    const series = Object.keys(data.overall_progress).map((key) => ({
      name: key,
      data: [data.overall_progress?.[key] || 0]
    }));

    return {
      ...CHART_OPTIONS,
      series,
      yAxis: {
        ...CHART_OPTIONS.yAxis,
        max: totalValue - 1
      },
      tooltip: {
        ...CHART_OPTIONS.tooltip,
        formatter() {
          // If you want to see what is available in the formatter, you can
          // examine the `this` variable.
          return `<b>${this.x}</b>
                  <span style="color:${this.point.color}">\u25CF</span> ${
            this.series.name
          } ${this.y}(${((this.y / totalValue) * 100).toFixed(0)}%)`;
        }
      }
    };
  };

  // ${Highcharts.numberFormat(this.y, 0)}

  return {
    metaPage,
    isTestRunsLoading,
    currentTab,
    allTestRuns,
    projectId,
    isAddTestRunsFormVisible,
    getOptions
  };
};

export default useTestRuns;
