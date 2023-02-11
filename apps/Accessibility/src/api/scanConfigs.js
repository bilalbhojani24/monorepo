import axios from 'axios';

export default async function fetchScanConfigs() {
  //   return new Promise((resolve) => {
  //     resolve(data.data);
  //   });
  const response = await axios.get(
    'https://run.mocky.io/v3/2041b41b-49db-4381-ada6-87f26770ec20'
  );
  // const response = await axios.get('/guidelines');
  if (response.data) {
    return response.data;
  }
  return false;
}
