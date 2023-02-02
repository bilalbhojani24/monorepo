import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProjectsAPI } from 'api/projects.api';
import { routeFormatter } from 'utils/helperFunctions';

import { dropDownOptions } from '../const/projectsConst';
import {
  setAddProjectModalVisibility,
  setDeleteProjectModalVisibility,
  setEditProjectModalVisibility,
  setMetaPage,
  setProjects,
  setSelectedProject
} from '../slices/projectSlice';

const useProjects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allProjects = useSelector((state) => state.projects.projects);
  const showAddModal = useSelector(
    (state) => state.projects.showAddProjectModal
  );
  const showEditModal = useSelector(
    (state) => state.projects.showEditProjectModal
  );
  const showDeleteModal = useSelector(
    (state) => state.projects.showDeleteProjectModal
  );
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );
  const metaPage = useSelector((state) => state.projects.metaPage);

  const addingProject = () => {
    dispatch(setAddProjectModalVisibility(true));
  };

  const fetchProjects = (toBeLoadedPage) => {
    getProjectsAPI(toBeLoadedPage).then((res) => {
      dispatch(setProjects(res.projects));
      dispatch(setMetaPage(res.info));
    });
  };

  const handleClickDynamicLink = (route, projectId) => (e) => {
    if (e.type === 'keydown' && e?.code !== 'Space') return;

    navigate(
      routeFormatter(route, {
        projectId
      })
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

  const handlerPaginatedLoad = (toBeLoadedPage) => {
    fetchProjects(toBeLoadedPage);
  };

  return {
    metaPage,
    selectedProject,
    onDropDownChange,
    allProjects,
    showAddModal,
    showEditModal,
    showDeleteModal,
    addingProject,
    handleClickDynamicLink,
    handlerPaginatedLoad,
    fetchProjects
  };
};

export default useProjects;
