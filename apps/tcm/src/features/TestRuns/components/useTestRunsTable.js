import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

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

  const getOptions = (data) => {
    const totalValue = Object.values(data.overall_progress).reduce(
      (total, num) => total + num,
      0
    );

    const series = Object.keys(data.overall_progress).map((key) => ({
      name: key,
      data: [data.overall_progress[key]]
    }));

    return {
      ...CHART_OPTIONS,
      series,
      yAxis: { ...CHART_OPTIONS.yAxis, max: totalValue - 1 }
    };
  };

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
