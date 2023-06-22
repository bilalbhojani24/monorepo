import axios from './axiosInstance';
import { URLS } from './constants';

/**
 * Create an issue.
 * @param {string} integrationKey - The integration key.
 * @param {object} fields - The issue fields.
 * @param {string} webHookStateHash - BE web hook state (optional).
 * @returns {Promise} - A promise that resolves with the created issue data.
 * @throws {Error} - If there is an error creating the issue.
 */

export const createIssue = (integrationKey, fields, webHookStateHash) => {
  const queryParams = {
    integration_key: integrationKey
  };
  if (webHookStateHash) {
    queryParams.state = webHookStateHash;
  }
  axios
    .post(
      URLS.TICKET,
      {
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
