import axios from 'axios';

import { getMcpBeUrl } from './utils';

const commonHeaders = {
  'Content-Type': 'application/json'
};

export const fetchSessionStatus = async (sessionId) => {
  const response = await axios.get(
    `${getMcpBeUrl()}/session/${sessionId}/state`,
    {
      headers: commonHeaders
    }
  );

  return response.data;
};

export const stopCurrentSession = async (sessionId) => {
  const response = await axios.get(
    `${getMcpBeUrl()}/session/${sessionId}/stop`,
    {
      headers: commonHeaders
    }
  );

  return response.data;
};

export const fetchSessionMetrics = async (sessionId) => {
  const response = await axios.get(`${getMcpBeUrl()}/session/${sessionId}`, {
    headers: commonHeaders
  });

  return response.data;
};
