import axios from 'axios';

import { getBaseUrl } from './utils';

const commonHeaders = {
  'Content-Type': 'application/json'
};

export const getSessions = async () => {
  const response = await axios.get(`${getBaseUrl()}/sessions`, {
    headers: commonHeaders
  });

  return response.data;
};

export const getDevices = async (platformName) => {
  const response = await axios.get(`${getBaseUrl()}/${platformName}/devices`, {
    headers: commonHeaders
  });

  return response.data;
};

export const getDeviceApplications = async (platformName, deviceId) => {
  const response = await axios.get(
    `${getBaseUrl()}/${platformName}/devices/${deviceId}/apps`,
    {
      headers: commonHeaders
    }
  );

  return response.data;
};

export const startSession = async (appAndDeviceIds) => {
  const response = await axios.post(
    `${getBaseUrl()}/session`,
    appAndDeviceIds,
    {
      headers: commonHeaders
    }
  );

  return response.data;
};
