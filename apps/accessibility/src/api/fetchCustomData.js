import axios from 'axios';

export default async function fetchCustomData() {
  const response = await axios.get('/guidelines');
  return response.data;
}
