import axios from 'axios';

export const fetchOptions = (path) => {
  const url = `https://integrations.bsstag.com/${path}`;
  return axios.get(url).then((response) => response.data.data.options);
};
