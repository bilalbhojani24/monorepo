import axios from 'axios';

export const fetchOptions = (path) =>
  axios.get(path).then((response) => response.data.data.options);
