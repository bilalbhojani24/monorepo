import { useDispatch } from 'react-redux';
import { getProjectsList } from 'globalSlice';
import useAuthRoutes from 'hooks/useAuthRoutes';

import { APP_ROUTES } from './constants/routesConstants';

import './App.scss';

const App = () => {
  const dispatch = useDispatch();
  return useAuthRoutes(
    APP_ROUTES,
    () => dispatch(getProjectsList()),
    'https://www.browserstack.com/users/sign_in'
  );
};

export default App;
