import axios from 'axios';
import { versionedBaseRoute } from 'constants/common';

export const initO11y = async () => axios.get(`${versionedBaseRoute()}/init`);
export const requestO11yAccess = async () =>
  axios.get(`${versionedBaseRoute()}/getAccess`);

export const getProjectsListAPI = async () =>
  axios.get(`${versionedBaseRoute()}/projects/lite`);
export const getPusherConfig = async () =>
  axios.get(`${versionedBaseRoute()}/projects/pusherAuth`);
export const upgradePlan = async () =>
  axios.post(`${versionedBaseRoute()}/plan/upgrade`);
