import axios from 'axios';

// const userInfo = {
//   user: {
//     groupId: 32,
//     id: 39
//   }
// };

export async function fetchScanOverviewData(id = null) {
  const response = await axios.get(`/website_scanner_reports/overview/`, {
    // ...userInfo,
    params: {
      // ...userInfo,
      id
    }
    // auth: {
    //   username: 'accessibility',
    //   password: 'password0'
    // }
  });
  // const response = await axios.get('/guidelines');
  if (response.data) {
    return response.data;
  }
  return false;
}

export async function fetchScanRuns(id = null) {
  const response = await axios.get(`/website_scanner_reports/`, {
    // ...userInfo,
    params: {
      // ...userInfo,
      id
    }
    // auth: {
    //   username: 'accessibility',
    //   password: 'password0'
    // }
  });
  // const response = await axios.get('/guidelines');
  if (response.data) {
    return response.data;
  }
  return false;
}

// /website_scanner_reports/overview
