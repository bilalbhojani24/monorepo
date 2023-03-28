import axios from 'axios';
import { versionedBaseRoute } from 'constants/common';

export const initO11y = async () => axios.get(`${versionedBaseRoute()}/init`);

export const getProjectsListAPI = async () =>
  axios.get(`${versionedBaseRoute()}/projects/lite`);
