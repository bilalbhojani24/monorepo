import { fetchGet, fetchPost } from './_utils/fetch';

export const checkTestManagementConnectionAPI = async (
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

export const importProjectsAPI = async (testManagementTool, payload) =>
  fetchPost(`/api/v1/import/${testManagementTool}/quick/insert`, payload);

export const getJiraConfigStatusAPI = async () =>
  fetchGet('/api/v1/integration/jira/configuration');

export const getLatestQuickImportConfigAPI = async () =>
  fetchGet('/api/v1/import/latest');

export const getQuickImportResultAPI = async (id) =>
  fetchGet(`/api/v1/import/quick/${id}/result`);

export const dismissNotificationAPI = async (id) =>
  fetchPost(`/api/v1/import/quick/${id}/dismiss_notification`);

export const retryImportAPI = async (id, tool) => {
  if (id && tool) return fetchGet(`/api/v1/import/${tool}/quick/${id}/retry`);
  throw new Error('importId and tool not found!');
};

export const dismissProgressBarAPI = async (importId) =>
  fetchPost(`/api/v1/import/quick/${importId}/dismiss_progress_banner`);

export const dismissTooltipAPI = async () =>
  fetchPost('/api/v1/user/dismiss-tooltip/quick_import_ftu');
