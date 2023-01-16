import axios from 'axios';

const BASE_URL = 'https://teststack.bsstag.com';

export const fetchPost = async (url, data, config) => {
  const response = await axios.post(BASE_URL + url, data, config);
  return response.data;
};

export const fetchPatch = async (url, data, config) => {
  const response = await axios.patch(BASE_URL + url, data, config);
  return response.data;
};

export const fetchGet = async (url, config) => {
  const response = await axios.get(BASE_URL + url, config);
  return response?.data;
};
export const fetchDel = async (url, config) => {
  const response = await axios.delete(BASE_URL + url, config);
  return response?.data;
};

export const fetchHead = async (url, config) =>
  await axios.head(BASE_URL + url, config);

export const retryRequest =
  (func, retryCount = 1, retryInterval = 1000) =>
  /* eslint-disable no-await-in-loop */
  async (...args) => {
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
