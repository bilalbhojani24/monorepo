import { fetchGet, fetchPost } from './_utils/fetch';

const STATUS_OBJECT = {
  status: 'ongoing',
  total: 0,
  success_count: 0,
  projects: [],
};

export const checkTestManagementConnection = async (
  testManagementTool,
  payload,
) =>
  await fetchPost(
    `/api/v1/import/${testManagementTool}/quick/test-connection`,
    payload,
  );

export const importProjects = async (testManagementTool, payload) =>
  await fetchPost(`/api/v1/import/${testManagementTool}/quick/insert`, payload);

export const getJiraConfigStatus = async () => {
  await fetchGet('/api/v1/integration/jira/configuration');
};

export const getQuickImportId = async () =>
  await fetchGet('/api/v1/import/ongoing');

export const getQuickImportStatus = async () => STATUS_OBJECT;
// await fetchGet(`/api/v1/import/quick/${id}/result`);
