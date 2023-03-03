import axios from 'axios';

export async function fetchScanLogs(id = null) {
  const response = await axios.get(`/website_scanner_reports/${id}`);
  // const response = await axios.get('/guidelines');
  if (response.data) {
    return response.data;
  }
  return false;
}

export async function fetchConsolidatedData(id) {
  const response = await axios.get(`/tests/consolidate?wsr_ids=${id}`);
  // const response = await axios.get('/guidelines');
  if (response.data) {
    return response.data;
  }
  return false;
}
