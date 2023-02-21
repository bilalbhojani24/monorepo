import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getActiveTestRunsAPI } from 'api/dashboard.api';
import { setSelectedProject } from 'globalSlice';

// import { setActiveTestRuns } from '../slices/dashboardSlice';
import { ACTIVE_TEST_RUNS_COLOR } from '../const/immutableConst';

import {
  barOptionsCreator,
  donutOptionCreator,
  lineOptionsCreator,
  stackedBarOptionsCreator
} from './chartHelpers';

export default function useDashboard() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const [activeTestRunsOptions, setActiveTestRunsOptions] = useState(null);
  const [testCasesTrendOptions, setTestCasesTrendOptions] = useState(null);
  const [closedTestRunsLineOptions, setClosedTestRunsLineOptions] =
    useState(null);
  const [closedTestRunsStackedOptions, setClosedTestRunsStackedOptions] =
    useState(null);
  const [jiraIssuesOptions, setJiraIssuesOptions] = useState(null);

  const activeTestRuns = useSelector((state) => state.dashboard.activeTestRuns);

  const fetchActiveTestRuns = () => {
    getActiveTestRunsAPI(projectId).then((res) => {
      if (!res.empty_data) {
        setActiveTestRunsOptions(
          donutOptionCreator({
            total: res.data.reduce((total, item) => item.y + total, 0),
            chartData: res.data.map((item) => [item.name, item.y]),
            colors: ACTIVE_TEST_RUNS_COLOR
          })
        );
      }
    });
    // dispatch(setActiveTestRuns(res));

    setClosedTestRunsLineOptions(lineOptionsCreator({}));
    setTestCasesTrendOptions(lineOptionsCreator({ showLegend: true }));
    setClosedTestRunsStackedOptions(
      stackedBarOptionsCreator({ showLegend: true })
    );
    setJiraIssuesOptions(barOptionsCreator({}));
    // });
  };

  useEffect(() => {
    dispatch(setSelectedProject(projectId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return {
    closedTestRunsStackedOptions,
    jiraIssuesOptions,
    activeTestRunsOptions,
    closedTestRunsLineOptions,
    testCasesTrendOptions,
    projectId,
    activeTestRuns,
    fetchActiveTestRuns
  };
}
