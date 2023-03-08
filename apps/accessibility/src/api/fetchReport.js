import axios from 'axios';

export default async function fetchReport({ ids, arList }) {
  let params = '';
  if (ids) {
    params += `ids=${ids}`;
  }
  if (arList) {
    params += `&ar_ids=${arList}`;
  }
  const response = await axios.get(`/tests/consolidate?${params}`, {
    headers: {
      Accept: 'application/json'
    }
  });
  return response.data.data;
}
