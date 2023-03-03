import axios from 'axios';

export default async function fetchScreenReaderDevices() {
  const response = await axios.get(
    '/api/screen-readers/supported-combinations',
    {
      headers: {
        Accept: 'application/json'
      }
    }
  );
  return response.data.data.combinations;
}
