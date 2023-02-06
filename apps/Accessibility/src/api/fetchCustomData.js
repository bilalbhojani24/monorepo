import axios from 'axios';

import { data } from './guidelines';

export default async function fetchCustomData() {
  return new Promise((resolve) => {
    resolve(data.data);
  });
  // const response = await axios.get(
  //   'https://accessibility-service.bsstag.com/guidelines'
  // );
  // // const response = await axios.get('/guidelines');
  // return response.data;
}
