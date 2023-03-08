import axios from 'axios';

export default async function fetchCustomData() {
  const response = await axios.get('/api/guidelines');
  return response.data;
}
