import { useDispatch } from 'react-redux';
import { useAuthRoutes } from '@browserstack/hooks';
import { getProjectsList } from 'globalSlice';

import { APP_ROUTES } from './constants/routesConstants';

const App = () => {
  const dispatch = useDispatch();
  return useAuthRoutes(
    APP_ROUTES,
    () => dispatch(getProjectsList()),
    'https://www.browserstack.com/users/sign_in'
  );
};

export default App;
