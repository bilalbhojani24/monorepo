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
  addNotificaton,
  deleteGlobalProject,
  updateGlobalProject
} from 'globalSlice';
import { routeFormatter } from 'utils/helperFunctions';
import { logEventHelper } from 'utils/logEvent';

import {
  dismissNewProjectNotification,
  getLatestQuickImportConfig
} from '../../../api/import.api';
import { COMPLETED } from '../../quickImportFlow/const/importConst';
import {
  setCurrentTestManagementTool,
  setImportedProjectCount,
  setNewProjectBannerDismiss,
  setShowNewProjectBanner
} from '../../quickImportFlow/slices/importSlice';
import { dropDownOptions } from '../const/projectsConst';
import {
  addProject,
  deleteProject,
  setAddProjectModalVisibility,
  setButtonLoaders,
  setCurrentProjectName,
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
  const createProjectCtaLoading = useSelector(
    (state) => state.projects.buttonLoader.createProjectCtaLoading
  );
  const editProjectCtaLoading = useSelector(
    (state) => state.projects.buttonLoader.editProjectCtaLoading
  );
  const deleteProjectCtaLoading = useSelector(
    (state) => state.projects.buttonLoader.deleteProjectCtaLoading
  );
  // fields from import
  const isNewProjectBannerDismissed = useSelector(
    (state) => state.import.isNewProjectBannerDismissed
  );
  const importStatus = useSelector((state) => state.import.importStatus);
  const latestImportId = useSelector((state) => state.import.importId);
  const countOfProjectsImported = useSelector(
    (state) => state.import.successfulImportedProjects
  );
  const currentTestManagementTool = useSelector(
    (state) => state.import.currentTestManagementTool
  );
  const showNewProjectBanner = useSelector(
    (state) => state.import.showNewProjectBanner
  );

  const showAddProjectModal = () => {
    dispatch(
      logEventHelper('TM_CreateProjectBtnClicked', {
        team: 'Test_Management',
        label: 'TM_CreateProjectBtnClicked'
      })
    );
    dispatch(setAddProjectModalVisibility(true));
  };

  const fetchProjects = () => {
    dispatch(setLoading(true));

    getProjectsAPI(searchParams.get('p'))
      .then((res) => {
        dispatch(setProjects(res.projects));
        dispatch(setMetaPage(res.info));
        dispatch(setLoading(false));
      })
      .catch(() => {
        dispatch(setLoading(false));
      });
  };

  const handleClickDynamicLink = (route, projectId, projectName) => (e) => {
    if (e.type === 'keydown' && e?.code !== 'Space') return;

    dispatch(setCurrentProjectName(projectName));
    navigate(
      routeFormatter(route, {
        projectId
      })
    );
  };

  const onDropDownChange = (selectedOption, selectedItem) => {
    if (selectedOption?.id === dropDownOptions[0].id) {
      dispatch(logEventHelper('TM_EditProjectLinkClicked', {}));
      dispatch(setEditProjectModalVisibility(true));
    } else if (selectedOption?.id === dropDownOptions[1].id) {
      dispatch(logEventHelper('TM_DeleteProjectLinkClicked', {}));
      dispatch(setDeleteProjectModalVisibility(true));
    }
    dispatch(setSelectedProject(selectedItem));
  };

  const hideDeleteProjectModal = () => {
    dispatch(setDeleteProjectModalVisibility(false));
  };

  const deleteProjectHandler = () => {
    if (selectedProject) {
      dispatch(
        logEventHelper('TM_DeleteProjectCtaClicked', {
          project_id: selectedProject?.id,
          project_name: selectedProject?.name
        })
      );
      dispatch(
        setButtonLoaders({ key: 'deleteProjectCtaLoading', value: true })
      );
      deleteProjectAPI(selectedProject.id)
        .then((res) => {
          dispatch(
            setButtonLoaders({ key: 'deleteProjectCtaLoading', value: false })
          );
          dispatch(deleteProject(res.data.project));
          dispatch(deleteGlobalProject(res.data.project));
          dispatch(
            setMetaPage({
              ...metaPage,
              count: metaPage.count - 1
            })
          );
          hideDeleteProjectModal();
        })
        .catch(() => {
          dispatch(
            setButtonLoaders({ key: 'deleteProjectCtaLoading', value: false })
          );
        });
    }
  };

  const hideAddProjectModal = () => {
    dispatch(setAddProjectModalVisibility(false));
    setFormError({ ...formError, nameError: '' });
    prop?.onClose?.();
  };

  const createProjectHandler = () => {
    if (!createProjectCtaLoading) {
      dispatch(logEventHelper('TM_CreateProjectCtaClicked', {}));
      if (formData.name.trim().length === 0) {
        setFormError({ ...formError, nameError: 'Name is not specified' });
        setFormData({ ...formData, name: '' });
      } else {
        dispatch(
          setButtonLoaders({ key: 'createProjectCtaLoading', value: true })
        );
        addProjectsAPI(formData)
          .then((res) => {
            dispatch(addProject(res.data.project));
            dispatch(addGlobalProject(res.data.project));
            dispatch(
              logEventHelper('TM_ProjectCreatedNotification', {
                project_id: res.data.project?.id
              })
            );
            dispatch(
              addNotificaton({
                id: `project_added${res.data.project?.id}`,
                title: `${res.data.project?.identifier} : Project created`,
                description: null,
                variant: 'success'
              })
            );

            navigate(
              routeFormatter(AppRoute.TEST_CASES, {
                projectId: res.data.project.id
              })
            );
            hideAddProjectModal();
            dispatch(
              setButtonLoaders({
                key: 'createProjectCtaLoading',
                value: false
              })
            );
          })
          .catch(() => {
            dispatch(
              setButtonLoaders({
                key: 'createProjectCtaLoading',
                value: false
              })
            );
          });
      }
    }
  };

  const hideEditProjectModal = () => {
    dispatch(setEditProjectModalVisibility(false));
  };

  const editProjectHandler = () => {
    dispatch(
      logEventHelper('TM_UpdateProjectCtaClicked', {
        project_id: selectedProject?.id,
        project_name: selectedProject?.name
      })
    );
    dispatch(setButtonLoaders({ key: 'editProjectCtaLoading', value: true }));
    editProjectAPI(selectedProject.id, {
      project: formData
    })
      .then((res) => {
        dispatch(
          setButtonLoaders({ key: 'editProjectCtaLoading', value: false })
        );
        dispatch(
          logEventHelper('TM_ProjectUpdatedNotification', {
            project_id: res.data.project?.id
          })
        );
        dispatch(updateProject(res.data.project));
        dispatch(updateGlobalProject(res.data.project));
        hideEditProjectModal();
      })
      .catch(() => {
        dispatch(
          setButtonLoaders({ key: 'editProjectCtaLoading', value: false })
        );
      });
  };

  const getStatusOfNewImportedProjects = async () => {
    try {
      const response = await getLatestQuickImportConfig();
      dispatch(
        setNewProjectBannerDismiss(response.new_projects_banner_dismissed)
      );
      if (
        !response.new_projects_banner_dismissed &&
        response.status === COMPLETED
      ) {
        dispatch(setShowNewProjectBanner(true));
        dispatch(setImportedProjectCount(response.import_projects_count));
        dispatch(
          setCurrentTestManagementTool(
            response.import_type.split('_')[0] === 'testrail'
              ? `${response.import_type.split('_')[0]}s`
              : response.import_type.split('_')[0]
          )
        );
      }
    } catch (err) {
      // catch error
    }
  };

  const dismissImportProjectAlert = () => {
    dismissNewProjectNotification(latestImportId).then(() => {
      dispatch(setNewProjectBannerDismiss(true));
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
    latestImportId,
    importStatus,
    showNewProjectBanner,
    countOfProjectsImported,
    isNewProjectBannerDismissed,
    currentTestManagementTool,
    dismissImportProjectAlert,
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
    createProjectCtaLoading,
    editProjectCtaLoading,
    deleteProjectCtaLoading,
    getStatusOfNewImportedProjects,
    editProjectHandler,
    hideEditProjectModal,
    dispatch
  };
};

export default useProjects;
