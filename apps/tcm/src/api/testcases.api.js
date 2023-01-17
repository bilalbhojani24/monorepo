import { fetchGet, fetchPost } from './_utils/fetch';

export const getTestCasesAPI = async ({ folderId, projectId }) =>
  fetchGet(`/api/v1/projects/${projectId}/folder/${folderId}/test-cases`);

export const addTestCaseAPI = async ({ projectId, folderId, payload }) =>
  fetchPost(
    `/api/v1/projects/${projectId}/folder/${folderId}/test-cases`,
    payload,
  );

export const deleteTestCaseAPI = async ({ projectId, folderId, testCaseId }) =>
  fetchPost(
    `/api/v1/projects/${projectId}/folder/${folderId}/test-cases/${testCaseId}/delete`,
  );

export const editTestCaseAPI = async ({
  projectId,
  folderId,
  testCaseId,
  payload,
}) =>
  fetchPost(
    `/api/v1/projects/${projectId}/folder/${folderId}/test-cases/${testCaseId}/edit`,
    payload,
  );

export const getTestCaseDetailsAPI = async ({
  folderId,
  projectId,
  testCaseId,
}) =>
  fetchGet(
    `/api/v1/projects/${projectId}/folder/${folderId}/test-cases/${testCaseId}/detail`,
  );
