import { useAuthRoutes } from '@browserstack/hooks';
import axios from 'axios';

import { versionedBaseRoute } from './constants/common';
import { APP_ROUTES } from './constants/routesConstants';

const initAPI = () => axios.get(`${versionedBaseRoute()}/projects/lite`);

const App = () =>
  useAuthRoutes(
    APP_ROUTES,
    initAPI,
    'https://www.browserstack.com/users/sign_in'
  );

export default App;
