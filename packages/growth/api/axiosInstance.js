import axios from 'axios';

const environment = window.location.host;
const isProd = environment.includes('.browserstack.com');
const baseURL = isProd
  ? 'https://browserstack.com/'
  : 'https://k8s-devos.bsstag.com/';

const axiosInstance = axios.create({
  baseURL,
  withCredentials: !isProd
});

export default axiosInstance;
