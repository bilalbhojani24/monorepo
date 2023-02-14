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
