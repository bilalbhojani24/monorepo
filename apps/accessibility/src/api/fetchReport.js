import axios from 'axios';

export default async function fetchReport({ ids, arList, websiteScanList }) {
  let params = '';
  if (ids) {
    params += `ids=${ids}`;
  }
  if (arList) {
    params += `${ids ? '&' : ''}ar_ids=${arList}`;
  }
  if (websiteScanList) {
    params += `${arList || ids ? '&' : ''}wsr_ids=${websiteScanList}`;
  }
  const response = await axios.get(`/tests/consolidate?${params}`, {
    headers: {
      Accept: 'application/json'
    }
  });
  return response.data.data;
}
