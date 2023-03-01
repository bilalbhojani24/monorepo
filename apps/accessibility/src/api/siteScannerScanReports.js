import axios from 'axios';

const userInfo = {
  user: {
    groupId: 32,
    id: 39
  }
};

export async function fetchScanLogs(id = null) {
  const response = await axios.get(
    `https://accessibility-service.bsstag.com/tests/consolidate`,
    {
      // ...userInfo,
      params: {
        ...userInfo,
        id
      },
      auth: {
        username: 'accessibility',
        password: 'password0'
      }
    }
  );
  // const response = await axios.get('/guidelines');
  if (response.data) {
    return response.data;
  }
  return false;
}

export async function fetchConsolidatedData(id) {
  const response = await axios.get(
    `https://accessibility-service.bsstag.com/tests/consolidate?wsr_ids=${id}`,
    {
      // ...userInfo,
      params: {
        ...userInfo,
        id
      },
      auth: {
        username: 'accessibility',
        password: 'password0'
      }
    }
  );
  // const response = await axios.get('/guidelines');
  if (response.data) {
    return response.data;
  }
  return false;
}
