import axios from 'axios';
import { getConfigByKey } from 'utils';

axios.defaults.baseURL =
  getConfigByKey('VITE_APP_BACKEND_URL') ||
  `${window.location.origin}/api`;

axios.interceptors.request.use((config) => ({
  ...config,
  withCredentials: true
}));
