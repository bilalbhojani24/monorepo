import axios from 'axios';

const onSuccess = (res) => res;

const onFailure = (res) => {
  const a = '';
  debugger;
  return res;
};
axios.interceptors.response.use(onSuccess, onFailure);
