import axios from 'axios';

export default async function auth() {
  return axios.get('/auth/start-sso');
}
