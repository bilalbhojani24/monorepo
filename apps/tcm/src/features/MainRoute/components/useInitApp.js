import { useDispatch } from 'react-redux';
import { getProjects } from 'api/projects.api';

import { setProjects } from '../../../slices/globalSlice';

const useInitApp = () => {
  const dispatch = useDispatch();

  const initApp = () => {
    getProjects().then((res) => {
      dispatch(setProjects(res.projects));
    });
  };

  return { initApp };
};

export default useInitApp;
