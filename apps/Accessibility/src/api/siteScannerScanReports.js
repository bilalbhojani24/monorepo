import axios from 'axios';

export async function fetchScanLogs(id = null) {
  const response = await axios.get(
    'https://run.mocky.io/v3/55f35669-f055-45a1-9305-58c74ed119af'
  );
  if (response.data) {
    return response.data;
  }
  return false;
}
