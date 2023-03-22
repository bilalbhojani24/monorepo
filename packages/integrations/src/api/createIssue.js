import axios from 'axios';

import { URLS } from './constants';

export const createIssue = (integrationKey, fields) =>
  axios
    .post(
      URLS.TICKET,
      {
        fields
      },
      {
        params: {
          integration_key: integrationKey
        }
      }
    )
    .then((response) => response.data);
