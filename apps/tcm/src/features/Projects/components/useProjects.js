import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getProjectsAPI } from 'api/projects.api';
import { routeFormatter } from 'utils/helperFunctions';

import { dropDownOptions } from '../const/projectsConst';
import {
  setAddProjectModalVisibility,
  setDeleteProjectModalVisibility,
  setEditProjectModalVisibility,
  setLoading,
  setMetaPage,
  setProjects,
  setSelectedProject
} from '../slices/projectSlice';

const useProjects = () => {
  const [searchParams] = useSearchParams();
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
  const isLoading = useSelector((state) => state.projects.isLoading);

  const addingProject = () => {
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

  const onDropDownChange = (e, selectedItem) => {
    if (e.currentTarget.textContent === dropDownOptions[0].body) {
      dispatch(setEditProjectModalVisibility(true));
    } else if (e.currentTarget.textContent === dropDownOptions[1].body) {
      dispatch(setDeleteProjectModalVisibility(true));
    }
    dispatch(setSelectedProject(selectedItem));
  };

  return {
    isLoading,
    currentPage: searchParams.get('p'),
    metaPage,
    selectedProject,
    onDropDownChange,
    allProjects,
    showAddModal,
    showEditModal,
    showDeleteModal,
    addingProject,
    handleClickDynamicLink,
    fetchProjects
  };
};

export default useProjects;
