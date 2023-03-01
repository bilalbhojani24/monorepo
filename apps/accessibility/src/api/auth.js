import axios from 'axios';

import './interceptor';

export default function auth() {
  return axios.get('/auth/start-sso');
}
