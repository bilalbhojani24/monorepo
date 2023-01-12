import { fetchGet, fetchPost } from './_utils/fetch';

export const getTestCases = async ({ folderId, projectId }) =>
  await fetchGet(`/api/v1/projects/${projectId}/folder/${folderId}/test-cases`);

export const addTestCase = async ({ projectId, folderId, payload }) =>
  await fetchPost(
    `/api/v1/projects/${projectId}/folder/${folderId}/test-cases`,
    payload,
  );

export const getTestCaseDetails = async ({ folderId, projectId, testCaseId }) =>
  await fetchGet(
    `/api/v1/projects/${projectId}/folder/${folderId}/test-cases/${testCaseId}`,
  );

export const getTestRunOfTestCase = async ({
  folderId,
  projectId,
  testCaseId,
}) =>
  await fetchGet(
    `/api/v1/projects/${projectId}/folder/${folderId}/test-cases/${testCaseId}/test-runs`,
  );
