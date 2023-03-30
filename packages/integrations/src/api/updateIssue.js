import axios from 'axios';

import { URLS } from './constants';

export const updateIssue = (integrationKey, ticketId, fields) =>
  axios
    .put(
      URLS.TICKET,
      {
        ticket_id: ticketId,
        fields
      },
      {
        params: {
          integration_key: integrationKey
        }
      }
    )
    .then((response) => response.data)
    .catch((errorResponse) => {
      throw errorResponse.response.data?.error;
    });
