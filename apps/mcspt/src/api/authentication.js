import axios from 'axios';

import { getBaseUrl, getCsptApiUrl } from './apiUtils';

export const fetchUserDetails = async () =>
  axios.get(`${getBaseUrl()}/auth/getUserDetails`);

export const fetchLatestToken = async () =>
  axios.get(`${getBaseUrl()}/auth/getLatestToken`);

export const userLogOut = async () => axios.get(`${getBaseUrl()}/auth/logout`);

export const confirmLoginForReverseSync = async () =>
  axios.get(`${getBaseUrl()}/auth/login-complete`);

export const fetchGeneralAnalytics = async () =>
  axios.get(`${getBaseUrl()}/analytics`);

export const saveUserFeedback = async (feedback) =>
  axios.post(`${getCsptApiUrl()}/feedbacks`, feedback);
