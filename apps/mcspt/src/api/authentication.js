import axios from 'axios';

import { getBaseUrl } from './utils';

export const fetchUserDetails = async () =>
  axios.get(`${getBaseUrl()}/auth/get-user-details`);

export const fetchLatestToken = async () =>
  axios.get(`${getBaseUrl()}/auth/get-latest-token`);

export const userLogOut = async () => axios.get(`${getBaseUrl()}/auth/logout`);
