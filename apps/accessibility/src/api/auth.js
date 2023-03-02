import axios from 'axios';

import './interceptor';

export default async function auth() {
  const response = await axios.get('/auth/start-sso');
  console.log('response.data: ', response.data);
  return response.data;
}
