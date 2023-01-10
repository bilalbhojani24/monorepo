import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from 'api/projects.api';

import { setProjects } from '../../../slices/globalSlice';
import { setAddProjectModalVisibility } from '../slices/projectSlice';

const useProjects = () => {
  const dispatch = useDispatch();
  const activeProjects = useSelector((state) => state.global.activeProjects);
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
