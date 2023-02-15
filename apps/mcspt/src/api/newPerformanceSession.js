import axios from 'axios';

import { getMcpBeUrl } from './utils';

const commonHeaders = {
  'Content-Type': 'application/json'
};

export const getAllSessionOfCurrrentUser = async () => {
  const response = await axios.get(`${getMcpBeUrl()}/sessions`, {
    headers: commonHeaders
  });

  return response.data;
};

export const getConnectedDevices = async (platformName) => {
  const response = await axios.get(`${getMcpBeUrl()}/${platformName}/devices`, {
    headers: commonHeaders
  });

  return response.data;
};

export const getApplicationsFromDevice = async (platformName, deviceId) => {
  const response = await axios.get(
    `${getMcpBeUrl()}/${platformName}/devices/${deviceId}/apps`,
    {
      headers: commonHeaders
    }
  );

  return response.data;
};

export const startSession = async (appAndDeviceIds) => {
  const response = await axios.post(
    `${getMcpBeUrl()}/session`,
    appAndDeviceIds,
    {
      headers: commonHeaders
    }
  );

  return response.data;
};
