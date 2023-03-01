import axios from 'axios';

import { data } from './screenReaderData';

export default async function fetchScreenReaderDevices() {
  return new Promise((resolve) => {
    resolve(data.data.combinations);
  });
  // const response = await axios.get(
  //   '/api/screen-readers/supported-combinations',
  //   {
  //     headers: {
  //       Accept: 'application/json'
  //     }
  //   }
  // );
  // return response.data.data.combinations;
}
