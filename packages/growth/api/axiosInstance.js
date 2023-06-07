import axios from 'axios';

const environment = window.location.host;
const baseURL = environment.includes('.browserstack.com')
  ? 'https://www.browserstack.com/'
  : 'https://k8s-devos.bsstag.com/';

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true
});

export default axiosInstance;
