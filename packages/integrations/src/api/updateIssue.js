import axios from './axiosInstance';
import { URLS } from './constants';

/**
 * Update an issue.
 * @param {string} integrationKey - The integration key.
 * @param {string} ticketId - The ticket ID.
 * @param {object} fields - The updated issue fields.
 * @param {string} webHookStateHash - BE web hook state (optional).
 * @returns {Promise} - A promise that resolves with the updated issue data.
 * @throws {Error} - If there is an error updating the issue.
 */

export const updateIssue = (
  integrationKey,
  ticketId,
  fields,
  webHookStateHash
) => {
  const queryParams = {
    integration_key: integrationKey
  };
  if (webHookStateHash) {
    queryParams.state = webHookStateHash;
  }

  return axios
    .put(
      URLS.TICKET,
      {
        ticket_id: ticketId,
        fields
      },
      {
        params: queryParams
      }
    )
    .then((response) => response.data)
    .catch((errorResponse) => {
      throw errorResponse.response.data?.error;
    });
};
