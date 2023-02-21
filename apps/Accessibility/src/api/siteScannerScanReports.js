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

export async function fetchOverviewData() {
  const response = await axios.get(
    'https://run.mocky.io/v3/b4f657e9-d1a9-4876-9db9-e4765d7c7c0f'
  );
  if (response.data) {
    return response.data;
  }
  return false;
}
