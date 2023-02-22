import axios from 'axios';
import AppRoute from 'const/routes';

const setupInterceptors = (navigateTo) => {
  const onSuccess = (res) => Promise.resolve(res);

  const onFailure = (res) => {
    if (res?.response?.status === 412) {
      // alpha no access error
      navigateTo(AppRoute.NO_ACCESS);
    }
    return Promise.reject(res);
  };

  axios.interceptors.response.use(onSuccess, onFailure);
};

export default setupInterceptors;
