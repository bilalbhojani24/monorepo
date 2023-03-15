import axios from 'axios';

import { URLS } from './constants';

export const getCreateMeta = (integrationKey, projectId, ticketTypeId) =>
  axios({
    method: 'get',
    url: URLS.CREATE_META,
    params: {
      integrationKey,
      projectId,
      ticketTypeId
    }
  }).then((response) => response.data.data);
