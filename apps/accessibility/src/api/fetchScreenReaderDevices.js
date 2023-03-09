import axios from 'axios';
import { getBrowserStackEnvUrl } from 'utils';

export default async function fetchScreenReaderDevices() {
  const baseURL = getBrowserStackEnvUrl();
  const getDevices = axios.create({
    baseURL
  });
  const response = await getDevices.get(
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
