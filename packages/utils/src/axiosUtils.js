import axios from 'axios';

export const responseInterceptor = (url = '/') => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        window.location.href = url;
      }
      return Promise.reject(error);
    }
  );
};
