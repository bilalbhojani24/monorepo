import axios from 'axios';

import { URLS } from './constants';

export const createIssue = (integrationKey, fields) =>
  axios({
    method: 'post',
    url: URLS.TICKET,
    params: {
      integration_key: integrationKey
    },
    data: {
      fields
    }
  }).then((response) => response.data);
