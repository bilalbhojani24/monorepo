import { getBaseUrlForWeb } from '@browserstack/mcp-shared';
import axios from 'axios';

export const fetchGeneralAnalyticsForWeb = () =>
  axios.get(`${getBaseUrlForWeb()}/analytics/get-web-analytics`);
