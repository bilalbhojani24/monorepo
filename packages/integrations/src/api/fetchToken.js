import { cookieUtils as Cookie } from '@browserstack/utils';
import axios from 'axios';

export const fetchToken = (url) => {
  if (!url) return null;
  const cookie = new Cookie();
  const integrationsToken = cookie.read('integrations_token');
  const hasToken = Boolean(integrationsToken);
  if (hasToken) {
    return Promise.resolve(integrationsToken);
  }
  return axios.get(url).then((response) => {
    cookie.create('integrations_token', response.data.access_token);
    return response;
  });
};
