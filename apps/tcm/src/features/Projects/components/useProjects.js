import { useDispatch, useSelector } from 'react-redux';

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

  return {
    activeProjects,
    showAddModal,
    addingProject,
  };
};

export default useProjects;
