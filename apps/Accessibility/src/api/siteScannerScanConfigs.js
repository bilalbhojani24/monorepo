import axios from 'axios';

export async function fetchScanConfigs() {
  //   return new Promise((resolve) => {
  //     resolve(data.data);
  //   });
  const response = await axios.get(
    'https://run.mocky.io/v3/63a12ba8-ece3-45c7-a7de-dc735549e1f1'
  );
  // const response = await axios.get('/guidelines');
  if (response.data) {
    return response.data;
  }
  return false;
}

export async function fetchScanConfigsById() {
  //   return new Promise((resolve) => {
  //     resolve(data.data);
  //   });
  const response = await axios.get(
    'https://run.mocky.io/v3/68b15b3f-4a6c-4f58-b2d9-c9e390f0467a'
  );
  // const response = await axios.get('/guidelines');
  if (response.data) {
    return response.data;
  }
  return false;
}
