import axios from 'axios';

export const fetchOptions = (path) => {
  const axiosOptions = {
    method: 'get',
    url: `https://integrations.bsstag.com/${path}`
  };
  return axios(axiosOptions).then((response) => response.data.data.options);
};
