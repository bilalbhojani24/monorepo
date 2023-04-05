import axios from 'axios';
import { versionedBaseRoute } from 'constants/common';

export const getProjectsListAPI = async () =>
  axios.get(`${versionedBaseRoute()}/projects/lite`);
