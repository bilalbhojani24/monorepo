import axios from 'axios';

export default async function fetchReport(ids, dashboardUserID) {
  const response = await axios.get(
    `/tests/consolidate?ids=${ids}&dashboardUserID=${dashboardUserID}`,
    {
      headers: {
        Accept: 'application/json'
      }
    }
  );
  return response.data.data;
}
