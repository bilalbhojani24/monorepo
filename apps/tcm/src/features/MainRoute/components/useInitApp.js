import { useDispatch } from 'react-redux';
import { getProjectsAPI } from 'api/projects.api';
import { setProjects } from 'globalSlice';

const useInitApp = () => {
  const dispatch = useDispatch();

  const initApp = () => {
    getProjectsAPI().then((res) => {
      dispatch(setProjects(res.projects));
    });
  };

  return { initApp };
};

export default useInitApp;
