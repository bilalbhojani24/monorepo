import axios from 'axios';

// const userInfo = {
//   user: {
//     groupId: 32,
//     id: 39
//   }
// };

export async function fetchScanConfigs() {
  //   return new Promise((resolve) => {
  //     resolve(data.data);
  //   });
  const response = await axios.get('/scan_configs', {
    // ...userInfo,
    // params: {
    //   ...userInfo
    // },
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

export async function fetchScanConfigsById(id) {
  const response = await axios.get(`/scan_configs/${id}`, {
    // ...userInfo,
    // params: {
    //   ...userInfo
    // },
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

export async function postNewScanConfig(payload) {
  //   return new Promise((resolve) => {
  //     resolve(data.data);
  //   });
  const response = await axios.post(
    '/scan_configs',
    {
      ...payload
    }
    // {
    //   auth: {
    //     username: 'accessibility',
    //     password: 'password0'
    //   }
    // }
  );
  if (response.data) {
    return response.data;
  }
  return false;
}

export async function runInstantScan(id) {
  //   return new Promise((resolve) => {
  //     resolve(data.data);
  //   });
  const response = await axios.post(
    `/scan_configs/${id}/new_scan_run`
    // {
    //   ...userInfo
    // },
    // {
    //   auth: {
    //     username: 'accessibility',
    //     password: 'password0'
    //   }
    // }
  );
  if (response.data) {
    return response.data;
  }
  return false;
}

export async function stopRecurringScans(id) {
  //   return new Promise((resolve) => {
  //     resolve(data.data);
  //   });
  const response = await axios.patch(
    `/scan_configs/${id}`
    // {
    //   ...userInfo
    // },
    // {
    //   auth: {
    //     username: 'accessibility',
    //     password: 'password0'
    //   }
    // }
  );
  // const response = await axios.get('/guidelines');
  if (response.data) {
    return response.data;
  }
  return false;
}
