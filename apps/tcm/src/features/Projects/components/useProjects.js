import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  addProjectsAPI,
  deleteProjectAPI,
  editProjectAPI,
  getProjectsAPI
} from 'api/projects.api';
import AppRoute from 'const/routes';
import {
  addGlobalProject,
  deleteGlobalProject,
  updateGlobalProject
} from 'globalSlice';
import { routeFormatter } from 'utils/helperFunctions';

import { dropDownOptions } from '../const/projectsConst';
import {
  addProject,
  deleteProject,
  setAddProjectModalVisibility,
  setDeleteProjectModalVisibility,
  setEditProjectModalVisibility,
  setLoading,
  setMetaPage,
  setProjects,
  setSelectedProject,
  updateProject
} from '../slices/projectSlice';

const useProjects = (prop) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalFocusRef = useRef();

  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const [formError, setFormError] = useState({
    nameError: ''
  });

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
  const isLoading = useSelector((state) => state.projects.isLoading);

  const showAddProjectModal = () => {
    dispatch(setAddProjectModalVisibility(true));
  };

  const fetchProjects = () => {
    dispatch(setLoading(true));
    getProjectsAPI(searchParams.get('p')).then((res) => {
      dispatch(setProjects(res.projects));
      dispatch(setMetaPage(res.info));
      dispatch(setLoading(false));
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

  const onDropDownChange = (e, selectedOption, selectedItem) => {
    if (selectedOption?.id === dropDownOptions[0].id) {
      dispatch(setEditProjectModalVisibility(true));
    } else if (selectedOption?.id === dropDownOptions[1].id) {
      dispatch(setDeleteProjectModalVisibility(true));
    }
    dispatch(setSelectedProject(selectedItem));
  };

  const hideDeleteProjectModal = () => {
    dispatch(setDeleteProjectModalVisibility(false));
  };

  const deleteProjectHandler = () => {
    if (selectedProject)
      deleteProjectAPI(selectedProject.id).then((res) => {
        dispatch(deleteProject(res.data.project));
        dispatch(deleteGlobalProject(res.data.project));
        dispatch(
          setMetaPage({
            ...metaPage,
            count: metaPage.count - 1
          })
        );
        hideDeleteProjectModal();
      });
  };

  const hideAddProjectModal = () => {
    dispatch(setAddProjectModalVisibility(false));
    prop?.onClose?.();
  };

  const createProjectHandler = () => {
    if (formData.name.length === 0) {
      setFormError({ ...formError, nameError: 'Name is not specified' });
    } else
      addProjectsAPI(formData).then((res) => {
        dispatch(addProject(res.data.project));
        dispatch(addGlobalProject(res.data.project));
        navigate(
          routeFormatter(AppRoute.TEST_CASES, {
            projectId: res.data.project.id
          })
        );
        hideAddProjectModal();
      });
  };

  const hideEditProjectModal = () => {
    dispatch(setEditProjectModalVisibility(false));
  };

  const editProjectHandler = () => {
    editProjectAPI(selectedProject.id, {
      project: formData
    }).then((res) => {
      dispatch(updateProject(res.data.project));
      dispatch(updateGlobalProject(res.data.project));
      hideEditProjectModal();
    });
  };

  return {
    modalFocusRef,
    isLoading,
    currentPage: searchParams.get('p'),
    metaPage,
    selectedProject,
    onDropDownChange,
    allProjects,
    showAddModal,
    showEditModal,
    showDeleteModal,
    showAddProjectModal,
    handleClickDynamicLink,
    fetchProjects,
    hideDeleteProjectModal,
    hideAddProjectModal,
    deleteProjectHandler,
    createProjectHandler,
    formData,
    setFormData,
    formError,
    setFormError,
    editProjectHandler,
    hideEditProjectModal
  };
};

export default useProjects;
