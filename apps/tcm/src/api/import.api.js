import { fetchGet, fetchPost } from './_utils/fetch';

export const checkTestManagementConnection = async (
  testManagementTool,
  payload
) => {
  const trimmedPayload = Object.entries(payload).reduce(
    (obj, [key, value]) => ({ ...obj, [key]: value.trim() }),
    {}
  );

  return fetchPost(
    `/api/v1/import/${testManagementTool}/quick/test-connection`,
    trimmedPayload
  );
};

export const importProjects = async (testManagementTool, payload) =>
  fetchPost(`/api/v1/import/${testManagementTool}/quick/insert`, payload);

export const getJiraConfigStatus = async () =>
  fetchGet('/api/v1/integration/jira/configuration');

export const getLatestQuickImportConfig = async () =>
  fetchGet('/api/v1/import/latest');

export const getQuickImportResult = async (id) =>
  fetchGet(`/api/v1/import/quick/${id}/result`);

export const dismissNotification = async (id) =>
  fetchPost(`/api/v1/import/quick/${id}/dismiss_notification`);

export const retryImport = async (id, tool) =>
  fetchGet(`/api/v1/import/${tool}/quick/${id}/retry`);

export const dismissProgressBar = async (importId) =>
  fetchPost(`/api/v1/import/quick/${importId}/dismiss_progress_banner`);

export const dismissTooltip = async () =>
  fetchPost('/api/v1/user/dismiss-tooltip/quick_import_ftu');
