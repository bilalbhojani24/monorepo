import axios from 'axios';

export default async function fetchReport(ids) {
  const response = await axios.get(`/tests/consolidate?ids=${ids}`, {
    headers: {
      Accept: 'application/json'
    }
  });
  return response.data.data;
}
