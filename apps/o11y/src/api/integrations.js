import axios from 'axios';
import { versionedBaseRoute } from 'constants/common';

export const getEmailPreferences = async () => {
  const endpoint = `${versionedBaseRoute()}/integrations/email-preferences`;

  return axios.get(endpoint);
};

export const submitEmailPreferences = async ({ payload }) => {
  const endpoint = `${versionedBaseRoute()}/api/v1/integrations/email-preferences`;
  return axios.put(endpoint, {
    payload
  });
};
