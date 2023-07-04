import axios from 'axios';

export const responseInterceptor = (redirectionUrl = '/') => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        window.location.href =
          typeof redirectionUrl === 'function'
            ? redirectionUrl()
            : redirectionUrl;
      }
      return Promise.reject(error);
    }
  );
};
