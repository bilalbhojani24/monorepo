import axios from 'axios';
import { getBrowserStackEnvUrl } from 'utils';

export default async function fetchScreenReaderDevices() {
  const baseURL = getBrowserStackEnvUrl();
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
