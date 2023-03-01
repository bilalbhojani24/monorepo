import axios from 'axios';

import { URLS } from './constants';

export const getOAuthUrlForTool = (integrationKey) =>
  axios({
    method: 'get',
    url: `${URLS.TOOL_OAUTH}/${integrationKey}`
  }).then((response) => response.data.redirect_uri);
