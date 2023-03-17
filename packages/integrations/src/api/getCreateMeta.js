import axios from 'axios';

import { URLS } from './constants';

export const getCreateMeta = (integrationKey, projectId, ticketTypeId) =>
  axios({
    method: 'get',
    url: URLS.CREATE_META,
    params: {
      integration_key: integrationKey,
      project_id: projectId,
      ticket_type_id: ticketTypeId
    }
  }).then((response) => response.data.data);
