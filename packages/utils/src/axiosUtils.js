import axios from 'axios';

export const responseInterceptor = (url = '/') => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        window.location.href = url;
      }
      return Promise.reject(error);
    }
  );
};
