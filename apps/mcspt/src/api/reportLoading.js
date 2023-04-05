import axios from 'axios';

import { getBaseUrl } from './apiUtils';

export const fetchSessionStatus = async (sessionId) => {
  const response = await axios.get(
    `${getBaseUrl()}/session/${sessionId}/state`
  );

  return response.data;
};

export const stopSession = async (sessionId, bodyParams) => {
  const response = await axios.post(
    `${getBaseUrl()}/session/${sessionId}/stop`,
    bodyParams
  );

  return response.data;
};

export const fetchSessionMetrics = async (sessionId) => {
  const response = await axios.get(`${getBaseUrl()}/session/${sessionId}`);

  return response.data;
};
