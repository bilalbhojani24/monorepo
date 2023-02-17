import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setSelectedProject } from 'globalSlice';
import {
  getActiveTestRuns
} from 'api/dashboard.api';

import {
  setActiveTestRuns
} from '../slices/dashboardSlice';

export default function useDashboard() {
  const { projectId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSelectedProject(projectId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const fetchActiveTestRuns = (projectId) => {
    getActiveTestRuns(projectId).then((res) => {
      dispatch(setActiveTestRuns(res));
    });
  };

  const activeTestRuns = useSelector(
    (state) => state.dashboard.activeTestRuns
  );

  return {
    projectId,
    fetchActiveTestRuns,
    activeTestRuns
  };
}
