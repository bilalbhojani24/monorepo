import axios from 'axios';

export const fetchOptions = (path, query) => {
  const axiosOptions = {
    method: 'get',
    url: `https://integrations.bsstag.com${path}`
  };
  if (query) {
    axiosOptions.params = {
      query
    };
  }
  return axios(axiosOptions).then((response) => response.data.data.options);
};
