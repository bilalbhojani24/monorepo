import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getActiveTestRuns } from 'api/dashboard.api';
import { setSelectedProject } from 'globalSlice';

import { setActiveTestRuns } from '../slices/dashboardSlice';

import { donutOptionCreator } from './chartHelpers';

export default function useDashboard() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const [activeTestRunsOptions, setActiveTestRunsOptions] = useState(null);

  const activeTestRuns = useSelector((state) => state.dashboard.activeTestRuns);

  const fetchActiveTestRuns = () => {
    getActiveTestRuns(projectId).then((res) => {
      dispatch(setActiveTestRuns(res));
      setActiveTestRunsOptions(donutOptionCreator());
    });
  };

  useEffect(() => {
    dispatch(setSelectedProject(projectId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return {
    activeTestRunsOptions,
    projectId,
    activeTestRuns,
    fetchActiveTestRuns
  };
}
