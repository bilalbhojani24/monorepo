import { getBaseUrl } from '@browserstack/mcp-shared';
import axios from 'axios';

export const fetchDefaultThresholds = async () => {
  const response = await axios.get(`${getBaseUrl()}/thresholds/1`);

  return response.data;
};
