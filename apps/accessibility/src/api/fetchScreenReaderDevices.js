import axios from 'axios';
import { getEnvUrl } from 'utils';

export default async function fetchScreenReaderDevices() {
  const baseURL = getEnvUrl();
  const response = await axios.get(
    '/screen-readers/supported-combinations',
    baseURL,
    {
      headers: {
        Accept: 'application/json'
      }
    }
  );
  return response.data.data.combinations;
}
