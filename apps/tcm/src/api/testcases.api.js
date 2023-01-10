import { fetchGet, fetchPost } from './_utils/fetch';

export const getTestCases = async ({ folderId, projectId }) =>
  await fetchGet(`/api/v1/projects/${projectId}/folder/${folderId}/test-cases`);

export const addTestCase = async ({ pId, fId, payload }) =>
  await fetchPost(`/api/v1/projects/${pId}/folder/${fId}/test-cases`, payload);
