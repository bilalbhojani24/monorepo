import axios from 'axios';

import { getBaseUrl } from './utils';

export const fetchDevices = async (platformName) => {
  const response = await axios.get(`${getBaseUrl()}/${platformName}/devices`);

  return response.data;
};

export const fetchDeviceApplications = async (platformName, deviceId) => {
  const response = await axios.get(
    `${getBaseUrl()}/${platformName}/devices/${deviceId}/apps`
  );

  return response.data;
};

export const startSession = async (appAndDeviceIds) => {
  const response = await axios.post(`${getBaseUrl()}/session`, appAndDeviceIds);

  return response.data;
};
