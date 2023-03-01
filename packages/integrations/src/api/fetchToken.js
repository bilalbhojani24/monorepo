import { cookieUtils as Cookie } from '@browserstack/utils';
import axios from 'axios';

export const fetchToken = (url) => {
  const cookie = new Cookie();
  const integrationsToken = cookie.read('integrations_token');
  const hasToken = Boolean(integrationsToken);
  if (hasToken) {
    return Promise.resolve(integrationsToken);
  }

  return axios({
    method: 'get',
    url,
    timeout: 15000,
    timeoutErrorMessage: 'Request timed out',
    headers: {
      Authorization:
        // 'Basic cmFqZWV2bmFpcl9DTElXYmo6OHZldTJuSHdLNGpRRlJCTWRjY2k='
        'Basic dGVzdGludGVncmF0aW9uc19wckFNYTk6Z1F6YXA3cm1lMTluYkphWnZOc0o='
    },
    params: {
      unique_user_id: 4
    }
  }).then((response) => {
    cookie.create('integrations_token', response.data.access_token);
    return response;
  });
};
