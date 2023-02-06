import axios from 'axios';

import { data } from './report';

export default async function fetchReport(ids, dashboardUserID) {
  return new Promise((resolve) => {
    resolve(data.data);
  });
  // const response = await axios.get(`/api/tests/consolidate?ids=${ids}&dashboardUserID=${dashboardUserID}`, {
  //   headers: {
  //     Accept: 'application/json'
  //   }
  // });
  // return response.data.data;
}
