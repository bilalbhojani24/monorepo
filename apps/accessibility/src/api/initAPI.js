import axios from 'axios';

export default function initAPI() {
  return axios.get('/v1/user/get-user-profile');
}