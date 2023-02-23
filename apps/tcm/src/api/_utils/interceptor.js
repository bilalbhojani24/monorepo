import axios from 'axios';
import AppRoute from 'const/routes';
import { addNotificaton } from 'globalSlice';

const setupInterceptors = (navigateTo, dispatch) => {
  const onSuccess = (res) => Promise.resolve(res);

  const onFailure = (res) => {
    if (res?.response?.status === 412) {
      // alpha no access error
      navigateTo(AppRoute.NO_ACCESS);
    }

    if (res?.response?.status === 500) {
      // if server error, show toast
      dispatch(
        addNotificaton({
          id: 'access_requested_done',
          title: res.message,
          description: null,
          variant: 'error'
        })
      );
    }
    return Promise.reject(res);
  };

  axios.interceptors.response.use(onSuccess, onFailure);
};

export default setupInterceptors;
