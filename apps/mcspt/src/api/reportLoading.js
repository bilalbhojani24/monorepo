import axios from 'axios';

import { getBaseUrl } from './utils';

const commonHeaders = {
  'Content-Type': 'application/json'
};

export const fetchSessionStatus = async (sessionId) => {
  const response = await axios.get(
    `${getBaseUrl()}/session/${sessionId}/state`,
    {
      headers: commonHeaders
    }
  );

  return response.data;
};

export const stopSession = async (sessionId) => {
  const response = await axios.get(
    `${getBaseUrl()}/session/${sessionId}/stop`,
    {
      headers: commonHeaders
    }
  );

  return response.data;
};

export const fetchSessionMetrics = async (sessionId) => {
  const response = await axios.get(`${getBaseUrl()}/session/${sessionId}`, {
    headers: commonHeaders
  });

  return response.data;
};
