import { getBaseUrlForWeb } from '@browserstack/mcp-shared';
import axios from 'axios';

export const fetchReportDataById = async (sessionId, authToken) => {
  const response = await axios.get(
    `${getBaseUrlForWeb()}/session/${sessionId}?auth_token=${authToken}`
  );

  return response.data;
};
