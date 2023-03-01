// import axios from 'axios';

import { data } from './data';

// const url = 'https://accessibility-service.bsstag.com';

export default async function fetchReports(dashboardUserID) {
  // const response = await axios.get(
  //   `${url}/api/tests?dashboardUserID=${dashboardUserID}`,
  //   {
  //     headers: {
  //       Accept: 'application/json'
  //     },
  //     auth: {
  //       username: 'accessibility',
  //       password: 'password0'
  //     },
  //     data: {
  //       user: {
  //         groupId: '2',
  //         id: '4',
  //         subGroupId: null
  //       }
  //     }
  //   }
  // );
  // return response.data.data.reports;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data.data.reports.slice(0, 50));
    }, 1000);
  });
}
