import axios from 'axios';

import { REQUEST_TIMOUT } from './constants';

const axiosInstance = axios.create({
  timeout: REQUEST_TIMOUT
});

export default axiosInstance;
