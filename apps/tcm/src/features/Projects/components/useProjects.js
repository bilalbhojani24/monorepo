import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppRoute from 'const/routes';
import { routeFormatter } from 'utils/helperFunctions';

import { setAddProjectModalVisibility } from '../slices/projectSlice';

const useProjects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeProjects = useSelector((state) => state.global.activeProjects);
  const showAddModal = useSelector(
    (state) => state.projects.showAddProjectModal,
  );

  const addingProject = () => {
    dispatch(setAddProjectModalVisibility(true));
  };

  const handleTestRunsClick = (projectId) => () => {
    navigate(
      routeFormatter(AppRoute.TEST_RUNS, {
        projectId,
      }),
    );
  };

  const handleTestCasesClick = (projectId) => () => {
    navigate(
      routeFormatter(AppRoute.TEST_CASES, {
        projectId,
      }),
    );
  };

  const handleProjectClick = (projectId) => () => {
    navigate(
      routeFormatter(AppRoute.DASHBOARD, {
        projectId,
      }),
    );
  };

  return {
    activeProjects,
    showAddModal,
    addingProject,
    handleTestRunsClick,
    handleTestCasesClick,
    handleProjectClick,
  };
};

export default useProjects;
