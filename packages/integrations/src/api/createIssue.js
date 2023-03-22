import axios from 'axios';

import { URLS } from './constants';

export const createIssue = (integrationKey, fields) =>
  axios
    .post(
      URLS.CREATE,
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
