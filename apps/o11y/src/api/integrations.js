import axios from 'axios';
import { versionedBaseRoute } from 'constants/common';

export const getIntegrationStatusBySlug = async ({ slug }) => {
  const endpoint = `${versionedBaseRoute()}/integrations/${slug}`;

  return axios.get(endpoint);
};

export const deleteIntegrationStatusBySlug = async ({ slug }) => {
  const endpoint = `${versionedBaseRoute()}/integrations/${slug}`;

  return axios.delete(endpoint);
};

export const updateIntegrationStatusBySlug = async ({
  slug,
  payload,
  isUpdate
}) => {
  const endpoint = `${versionedBaseRoute()}/integrations/${slug}`;

  if (isUpdate) {
    return axios.put(endpoint, payload);
  }

  return axios.post(endpoint, payload);
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
