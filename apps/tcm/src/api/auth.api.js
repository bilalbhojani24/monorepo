import axios from 'axios';

export const authUser = async () =>
  axios.get(`https://teststack.bsstag.com/api/v1`);
