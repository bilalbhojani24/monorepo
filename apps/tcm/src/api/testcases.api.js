import { fetchGet, fetchPost } from './_utils/fetch';

export const getTestCases = async ({ folderId, projectId }) =>
  fetchGet(`/api/v1/projects/${projectId}/folder/${folderId}/test-cases`);

export const addTestCase = async ({ projectId, folderId, payload }) =>
  fetchPost(
    `/api/v1/projects/${projectId}/folder/${folderId}/test-cases`,
    payload,
  );

export const getTestCaseDetails = async ({ folderId, projectId, testCaseId }) =>
  fetchGet(
    `/api/v1/projects/${projectId}/folder/${folderId}/test-cases/${testCaseId}/detail`,
  );
