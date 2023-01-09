import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from 'api/projects.api';

import {
  setAddProjectModalVisibility,
  setProjects,
} from '../slices/projectSlice';

const useProjects = () => {
  const dispatch = useDispatch();
  const activeProjects = useSelector((state) => state.projects.allProjects);
  const showAddModal = useSelector(
    (state) => state.projects.showAddProjectModal,
  );

  const addingProject = () => {
    dispatch(setAddProjectModalVisibility(true));
  };

  const getAllProjects = () => {
    getProjects().then((res) => {
      dispatch(setProjects(res.projects));
    });
  };

  useEffect(() => {
    getAllProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    activeProjects,
    showAddModal,
    addingProject,
    getAllProjects,
  };
};

export default useProjects;
