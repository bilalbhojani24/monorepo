import { fetchGet } from './_utils/fetch';

export const getSettingsApiKeys = async () =>
  fetchGet('/api/v1/settings/api-keys');

export const getJiraConfigurations = async () =>
  fetchGet('/api/v1/integration/jira/configuration');
