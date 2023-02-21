import axios from 'axios';

export async function fetchScanRuns(id = null) {
  const response = await axios.get(
    'https://run.mocky.io/v3/85ea0a0f-6b1c-4cb6-993e-7b9252837532'
  );
  if (response.data) {
    return response.data;
  }
  return false;
}

export async function fetchScanOverviewData(id = null) {
  const response = await axios.get(
    'https://run.mocky.io/v3/c1446a3d-17fe-4c42-97ac-0e18cea2c162'
  );
  if (response.data) {
    return response.data;
  }
  return false;
}
