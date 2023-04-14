import axios from './axiosInstance';
import { URLS } from './constants';

export const getTickets = (integrationKey, projectId, format) =>
  axios
    .get(URLS.TICKET, {
      params: {
        integration_key: integrationKey,
        project_id: projectId,
        format
      }
    })
    .then((response) => response.data.data.options);