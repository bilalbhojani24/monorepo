import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { routeFormatter } from 'utils/helperFunctions';

import {
  setAddProjectModalVisibility,
  setDeleteProjectModalVisibility,
  setEditProjectModalVisibility,
} from '../slices/projectSlice';

const useProjects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeProjects = useSelector((state) => state.global.activeProjects);
  const showAddModal = useSelector(
    (state) => state.projects.showAddProjectModal,
  );
  const showEditModal = useSelector(
    (state) => state.projects.showEditProjectModal,
  );
  const showDeleteModal = useSelector(
    (state) => state.projects.showDeleteProjectModal,
  );

  const addingProject = () => {
    dispatch(setAddProjectModalVisibility(true));
  };

  const handleClickDynamicLink = (route, projectId) => () => {
    navigate(
      routeFormatter(route, {
        projectId,
      }),
    );
  };

  return {
    activeProjects,
    showAddModal,
    showEditModal,
    showDeleteModal,
    addingProject,
    handleClickDynamicLink,
  };
};

export default useProjects;
