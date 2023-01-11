import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppRoute from 'const/routes';

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
    navigate(`${AppRoute.PROJECTS}/${projectId}${AppRoute.TEST_RUNS}`);
  };

  const handleTestCasesClick = (projectId) => () => {
    navigate(`${AppRoute.PROJECTS}/${projectId}${AppRoute.TEST_CASES}`);
  };

  const handleProjectClick = (projectId) => () => {
    navigate(`${AppRoute.PROJECTS}/${projectId}${AppRoute.DASHBOARD}`);
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
