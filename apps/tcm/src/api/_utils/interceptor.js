import axios from 'axios';
import AppRoute from 'const/routes';
import { addNotificaton } from 'globalSlice';

const GENERIC_MESSAGE =
  'Some technical error occurred. Please try again. If this issue persists, contact Support.';
const ERROR_TITLE = 'Error occurred';

const setupInterceptors = (navigateTo, dispatch) => {
  const onSuccess = (res) => Promise.resolve(res);

  const showGenericToast = ({ response, id }) => {
    if (response?.noToast) return;

    dispatch(
      addNotificaton({
        id,
        title: ERROR_TITLE,
        description: response?.errors?.message || GENERIC_MESSAGE,
        variant: 'error'
      })
    );
  };

  const onFailure = (res) => {
    let rejectResponse = res;
    const statusCode = res?.response?.status;
    const response = JSON.parse(res?.request?.response);

    if (statusCode >= 400 && statusCode <= 499) {
      // 4xx codes

      switch (statusCode) {
        case 412:
          // alpha no access error
          navigateTo(AppRoute.NO_ACCESS);
          break;

        case 404:
          // if API doesnt exist go to 404 page
          rejectResponse = { rejectAll: true };
          navigateTo(AppRoute.NOT_FOUND);
          break;

        case 400:
        case 421:
        case 422:
          showGenericToast({ id: '4xx_error', response });
          break;
        default:
        // console.log(response);
      }
    } else if (statusCode >= 500 && statusCode <= 599) {
      switch (statusCode) {
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
        case 505:
        case 506:
        case 507:
        case 509:
        case 510:
          showGenericToast({ id: '5xx_error', response });
          break;
        default:
        // console.log(response);
      }
    }

    return Promise.reject(rejectResponse);
  };

  axios.interceptors.response.use(onSuccess, onFailure);
};

export default setupInterceptors;
