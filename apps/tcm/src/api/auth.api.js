import axios from 'axios';

export const authUser = async () =>
  await axios.get(`https://teststack.bsstag.com/api/v1`);
