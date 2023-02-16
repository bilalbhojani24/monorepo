import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { capitalizeString } from 'utils/helperFunctions';

import { CHART_OPTIONS, TR_DROP_OPTIONS } from '../const/immutableConst';
import {
  setEditTestRunForm,
  setIsVisibleProps,
  setSelectedTestRun
} from '../slices/testRunsSlice';

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
    if (!data?.overall_progress) return CHART_OPTIONS;

    const totalValue = Object.values(data.overall_progress).reduce(
      (total, num) => total + num,
      0
    );

    const series = Object.keys(data.overall_progress).map((key) => ({
      groupPadding: 0,
      pointPadding: 0,
      name: key,
      data: [data.overall_progress?.[key] || 0]
    }));

    return {
      ...CHART_OPTIONS,
      series,
      yAxis: {
        ...CHART_OPTIONS.yAxis,
        max: totalValue
      },
      tooltip: {
        ...CHART_OPTIONS.tooltip,
        formatter() {
          return `<div><b>${this.x}</b></div>
                  <span style="color:${
                    this.point.color
                  }">\u25CF</span> <span class="whitespace-nowrap">${capitalizeString(
            this.series.name
          )} ${this.y} (${((this.y / totalValue) * 100).toFixed(0)}%)</span>`;
        }
      }
    };
  };

  const onDropDownChange = (e, selectedItem) => {
    dispatch(setSelectedTestRun(selectedItem));
    switch (e.currentTarget.textContent) {
      case TR_DROP_OPTIONS[0].body: // edit
        dispatch(setEditTestRunForm(true));
        break;
      case TR_DROP_OPTIONS[1].body: // assign
        dispatch(setIsVisibleProps({ key: 'assignTestRunModal', value: true }));
        break;
      case TR_DROP_OPTIONS[2].body: // close_run
        dispatch(
          setIsVisibleProps({ key: 'closeRunTestRunModal', value: true })
        );
        break;
      case TR_DROP_OPTIONS[3].body: // delete
        dispatch(setIsVisibleProps({ key: 'deleteTestRunModal', value: true }));
        break;
      default:
        break;
    }
  };

  return {
    metaPage,
    isTestRunsLoading,
    currentTab,
    allTestRuns,
    projectId,
    isAddTestRunsFormVisible,
    getOptions,
    onDropDownChange
  };
};

export default useTestRuns;
