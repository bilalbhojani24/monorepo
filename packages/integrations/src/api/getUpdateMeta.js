import axios from './axiosInstance';
import { URLS } from './constants';

export const getUpdateMeta = (integrationKey, ticketTypeId) =>
  axios
    .get(URLS.UPDATE_META, {
      params: {
        integration_key: integrationKey,
        ticket_id: ticketTypeId,
        values: true
      }
    })
    .then((response) => response.data.data);
