import axios from './axiosInstance';
import { URLS } from './constants';

export const createIssue = (integrationKey, fields, stateHash) =>
  axios
    .post(
      URLS.TICKET,
      {
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
