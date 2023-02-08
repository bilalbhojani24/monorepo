import { useDispatch } from 'react-redux';
import { getProjectsMinifiedAPI } from 'api/projects.api';
import { setAllProjects } from 'globalSlice';

const useInitApp = () => {
  const dispatch = useDispatch();

  const initApp = () => {
    getProjectsMinifiedAPI().then((res) => {
      dispatch(setAllProjects(res.projects));
    });
  };

  return { initApp };
};

export default useInitApp;
