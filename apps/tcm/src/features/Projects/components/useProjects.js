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
import { redirectToPrevPage, routeFormatter } from 'utils/helperFunctions';
import { logEventHelper } from 'utils/logEvent';

// import { setNotificationConfig } from '../../ImportProgress/slices/importProgressSlice';
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
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalFocusRef = useRef();
  const totalProjectsCountRef = useRef(0);

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
  const importId = useSelector((state) => state.import.importId);
  const countOfProjectsImported = useSelector(
    (state) => state.import.successfulImportedProjects
  );
  const currentTestManagementTool = useSelector(
    (state) => state.import.currentTestManagementTool
  );
  const showNewProjectBanner = useSelector(
    (state) => state.import.showNewProjectBanner
  );
  // import progress
  const importStatus = useSelector(
    (state) => state.importProgress.importStatus
  );
  const isProgressDismissed = useSelector(
    (state) => state.importProgress.isProgressDismissed
  );

  const handleAmplitudeEvent = (projectId, action) => {
    dispatch(
      logEventHelper(`TM_${action}ClickedProjectList`, {
        project_id: projectId
      })
    );
  };

  const showAddProjectModal = (action) => {
    if (action === 'emptyState') {
      dispatch(logEventHelper('TM_CreateProjectBtnClickedEmptyState', {}));
    }

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
        totalProjectsCountRef.current = res.projects.length;
        dispatch(setProjects(res.projects));
        dispatch(setMetaPage(res.info));
        dispatch(setLoading(false));
      })
      .catch(() => {
        dispatch(setLoading(false));
      });
  };

  const handleClickDynamicLink =
    (route, projectId, projectName, action) => (e) => {
      if (e.type === 'keydown' && e?.code !== 'Space') return;

      handleAmplitudeEvent(projectId, action);
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

          if (totalProjectsCountRef.current === 1 && searchParams.get('p'))
            redirectToPrevPage(searchParams, setSearchParams);
          else fetchProjects();

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

  const hideAddProjectModal = (action) => {
    if (action === 'Cancel')
      dispatch(logEventHelper('TM_CreateProjectBtnClickedEmptyState', {}));
    dispatch(setAddProjectModalVisibility(false));
    setFormError({ ...formError, nameError: '' });
    prop?.onClose?.();
  };

  const createProjectHandler = () => {
    if (!createProjectCtaLoading) {
      dispatch(logEventHelper('TM_CreateProjectCtaClicked', {}));
      if (formData.name.trim().length === 0) {
        setFormError({ ...formError, nameError: 'This is a required field' });
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
                title: `${res.data.project?.name} : Project created`,
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
            setTimeout(() => {
              // we are turning off the loader 100ms after hiding the modal, just to ensure that user is not able to click on create button in any case
              dispatch(
                setButtonLoaders({
                  key: 'createProjectCtaLoading',
                  value: false
                })
              );
            }, 500);
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
    setFormError({ ...formError, nameError: '' });
  };

  const editProjectHandler = () => {
    if (formData.name.trim().length === 0) {
      setFormError({ ...formError, nameError: 'This is a required field' });
      setFormData({ ...formData, name: '' });
    } else {
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
    }
  };

  // const closeProgressNotification = () => {
  //   dispatch(setNotificationConfig({ show: false }));
  // };

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
    importId,
    importStatus,
    isProgressDismissed,
    showNewProjectBanner,
    countOfProjectsImported,
    isNewProjectBannerDismissed,
    currentTestManagementTool,
    // dismissImportProjectAlert,
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
    // closeProgressNotification,
    editProjectHandler,
    hideEditProjectModal,
    dispatch
  };
};

export default useProjects;
