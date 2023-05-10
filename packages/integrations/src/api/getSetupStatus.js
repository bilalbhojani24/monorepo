import axios from './axiosInstance';
import { URLS } from './constants';

export const getSetupStatus = (integrationKey) =>
  axios
    .get(URLS.SETUP_STATUS, {
      params: {
        integration_key: integrationKey
      }
    })
    .then((response) => response);
