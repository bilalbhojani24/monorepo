import axios from 'axios';

import { URLS } from './constants';

export const getTokenConnectionForTool = (integrationKey, fieldsData) =>
  axios({
    method: 'post',
    url: URLS.TOOL_API_TOKEN_CONNECTION,
    data: {
      integration_key: integrationKey,
      auth_info: fieldsData
    }
  }).then((response) => response.data);
