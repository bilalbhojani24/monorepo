import { getBaseUrl } from '@browserstack/mcp-shared';
import axios from 'axios';

export const fetchSharableLink = async (sessionId) => {
  const response = await axios.post(
    `${getBaseUrl()}/session/share/${sessionId}`
  );

  return response.data;
};
