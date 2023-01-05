import axios from 'axios';
const BASE_URL = 'https://teststack.bsstag.com';

export const fetchPost = async (url, data, config) => {
  const response = await axios.post(BASE_URL + url, data, config);
  return response.data;
};

export const fetchGet = async (url, config) => {
  const response = await axios.get(BASE_URL + url, config).catch((error) => {
    console.log(error);
    window.location.href = 'https://www.browserstack.com/users/sign_in';
  });
  return response?.data;
};

export const fetchHead = async (url, config) => {
  const response = await axios.head(BASE_URL + url, config);
  return response;
};

export const retryRequest = (func, retryCount = 1, retryInterval = 1000) => {
  /* eslint-disable no-await-in-loop */
  return async (...args) => {
    for (let i = 0; i <= retryCount; i += 1) {
      try {
        return await func(...args);
      } catch (err) {
        if (i === retryCount) {
          throw err;
        }
        await new Promise((resolve) => setTimeout(resolve, retryInterval));
      }
    }
    return undefined;
  };
  /* eslint-enable no-await-in-loop */
};
