import { useDispatch } from 'react-redux';
import { getProjectsAPI } from 'api/projects.api';
import { setAllProjects } from 'globalSlice';

const useInitApp = () => {
  const dispatch = useDispatch();

  const initApp = () => {
    getProjectsAPI().then((res) => {
      dispatch(setAllProjects(res.projects));
    });
  };

  return { initApp };
};

export default useInitApp;
