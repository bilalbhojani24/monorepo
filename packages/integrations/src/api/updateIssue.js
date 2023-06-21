import axios from './axiosInstance';
import { URLS } from './constants';

export const updateIssue = (integrationKey, ticketId, fields, stateHash) =>
  axios
    .put(
      URLS.TICKET,
      {
        ticket_id: ticketId,
        fields
      },
      {
        params: {
          integration_key: integrationKey,
          ...(stateHash ? { state: stateHash } : {})
        }
      }
    )
    .then((response) => response.data)
    .catch((errorResponse) => {
      throw errorResponse.response.data?.error;
    });
