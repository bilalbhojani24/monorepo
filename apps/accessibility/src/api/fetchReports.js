import axios from 'axios';

export default async function fetchReports(dashboardUserID) {
  const response = await axios.get(
    `/tests?dashboardUserID=${dashboardUserID}`,
    {
      headers: {
        Accept: 'application/json'
      }
    }
  );
  return response.data.data.reports;
}
