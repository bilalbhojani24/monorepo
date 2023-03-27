import axios from 'axios';

import { getBaseUrl } from './apiUtils';

export const fetchUserDetails = async () =>
  axios.get(`${getBaseUrl()}/auth/getUserDetails`);

export const fetchLatestToken = async () =>
  axios.get(`${getBaseUrl()}/auth/getLatestToken`);

export const userLogOut = async () => axios.get(`${getBaseUrl()}/auth/logout`);

export const confirmLoginForReverseSync = async () =>
  axios.get(`${getBaseUrl()}/auth/login-complete`);
