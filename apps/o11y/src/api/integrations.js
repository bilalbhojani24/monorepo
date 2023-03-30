import axios from 'axios';
import { versionedBaseRoute } from 'constants/common';

export const getIntegrationStatusBySlug = async ({ slug }) => {
  const endpoint = `${versionedBaseRoute()}/integrations/${slug}`;

  return axios.get(endpoint);
};

export const getEmailPreferences = async () => {
  const endpoint = `${versionedBaseRoute()}/integrations/email-preferences`;

  return axios.get(endpoint);
};

export const submitEmailPreferences = async ({ payload }) => {
  const endpoint = `${versionedBaseRoute()}/integrations/email-preferences`;
  return axios.put(endpoint, {
    payload
  });
};
