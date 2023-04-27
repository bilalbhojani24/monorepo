import axios from 'axios';
import AppRoute from 'const/routes';
import { addNotificaton } from 'globalSlice';

const GENERIC_MESSAGE =
  'Some technical error occurred. Please try again. If this issue persists, contact Support.';
const ERROR_TITLE = 'Error occurred';

const setupInterceptors = (navigateTo, dispatch) => {
  const onSuccess = (res) => Promise.resolve(res);

  const onFailure = (res) => {
    const statusCode = res?.response?.status;
    const response = JSON.stringify(res?.request?.response);

    if (statusCode >= 400 && statusCode <= 499) {
      // 4xx codes

      switch (statusCode) {
        case 412:
          // alpha no access error
          navigateTo(AppRoute.NO_ACCESS);
          break;

        case 404:
          // if API doesnt exist go to 404 page
          navigateTo(AppRoute.NOT_FOUND);
          break;

        default:
          dispatch(
            addNotificaton({
              id: '4xx_error',
              title: ERROR_TITLE,
              description: response?.errors?.message || GENERIC_MESSAGE,
              variant: 'error'
            })
          );
      }
    } else if (statusCode >= 500 && statusCode <= 599) {
      if (res?.response?.status === 500) {
        // if server error, show toast
        dispatch(
          addNotificaton({
            id: 'server_error',
            title: ERROR_TITLE,
            description: GENERIC_MESSAGE,
            variant: 'error'
          })
        );
      } else {
        // generic error toast
        dispatch(
          addNotificaton({
            id: 'server_error_generic_error',
            title: ERROR_TITLE,
            description: GENERIC_MESSAGE,
            variant: 'error'
          })
        );
      }
    }

    return Promise.reject(res);
  };

  axios.interceptors.response.use(onSuccess, onFailure);
};

export default setupInterceptors;
