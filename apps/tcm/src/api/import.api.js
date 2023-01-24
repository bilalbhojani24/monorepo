import { fetchGet, fetchPost } from './_utils/fetch';

export const checkTestManagementConnection = async (
  testManagementTool,
  payload
) =>
  await fetchPost(
    `/api/v1/import/${testManagementTool}/quick/test-connection`,
    payload
  );

export const importProjects = async (testManagementTool, payload) =>
  await fetchPost(`/api/v1/import/${testManagementTool}/quick/insert`, payload);

export const getJiraConfigStatus = async () => {
  await fetchGet('/api/v1/integration/jira/configuration');
};

export const getLatestQuickImportConfig = async () =>
  await fetchGet('/api/v1/import/latest');

export const getQuickImportStatus = async (id) =>
  await fetchGet(`/api/v1/import/quick/${id}/result`);

export const dismissNotificationForImport = async (id) =>
  await fetchPost(`/api/v1/import/quick/${id}/dismiss_notification`);
