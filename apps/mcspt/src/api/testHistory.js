import axios from 'axios';

import { getBaseUrl } from './apiUtils';

export const fetchSessions = async () => {
  const response = await axios.get(`${getBaseUrl()}/sessions`);

  return response.data;
};

export const fetchSessionById = async (sessionId) => {
  const response = await axios.get(`${getBaseUrl()}/session/${sessionId}`);

  return response.data;
};
