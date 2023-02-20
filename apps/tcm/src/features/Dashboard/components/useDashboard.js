import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { getActiveTestRuns } from 'api/dashboard.api';
import { setSelectedProject } from 'globalSlice';

// import { setActiveTestRuns } from '../slices/dashboardSlice';
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
    // getActiveTestRuns(projectId).then((res) => {
    // dispatch(setActiveTestRuns(res));
    setActiveTestRunsOptions(
      donutOptionCreator({ title: '1024', subtitle: 'Total Test Cases' })
    );
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
