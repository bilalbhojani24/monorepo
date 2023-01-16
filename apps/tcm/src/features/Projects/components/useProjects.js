import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { routeFormatter } from 'utils/helperFunctions';

import { dropDownOptions } from '../const/projectsConst';
import {
  setAddProjectModalVisibility,
  setDeleteProjectModalVisibility,
  setEditProjectModalVisibility,
  setSelectedProject,
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
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject,
  );

  const addingProject = () => {
    dispatch(setAddProjectModalVisibility(true));
  };

  const handleClickDynamicLink = (route, projectId) => (e) => {
    if (e.type === 'keydown' && e?.code !== 'Space') return;

    navigate(
      routeFormatter(route, {
        projectId,
      }),
    );
  };

  const onDropDownChange = (e, selectedItem) => {
    if (e.currentTarget.textContent === dropDownOptions[0].body) {
      dispatch(setEditProjectModalVisibility(true));
    } else if (e.currentTarget.textContent === dropDownOptions[1].body) {
      dispatch(setDeleteProjectModalVisibility(true));
    }
    dispatch(setSelectedProject(selectedItem));
  };

  return {
    selectedProject,
    onDropDownChange,
    activeProjects,
    showAddModal,
    showEditModal,
    showDeleteModal,
    addingProject,
    handleClickDynamicLink,
  };
};

export default useProjects;
