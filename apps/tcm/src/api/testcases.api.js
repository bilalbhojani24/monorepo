import { fetchGet, fetchPost } from './_utils/fetch';

export const getTestCasesAPI = async ({ folderId, projectId }) =>
  fetchGet(`/api/v1/projects/${projectId}/folder/${folderId}/test-cases`);

export const addTestCaseAPI = async ({ projectId, folderId, payload }) =>
  fetchPost(
    `/api/v1/projects/${projectId}/folder/${folderId}/test-cases`,
    payload
  );

export const deleteTestCaseAPI = async ({ projectId, folderId, testCaseId }) =>
  fetchPost(
    `/api/v1/projects/${projectId}/folder/${folderId}/test-cases/${testCaseId}/delete`
  );

export const editTestCaseAPI = async ({
  projectId,
  folderId,
  testCaseId,
  payload
}) =>
  fetchPost(
    `/api/v1/projects/${projectId}/folder/${folderId}/test-cases/${testCaseId}/edit`,
    payload
  );

export const getTestCaseDetailsAPI = async ({
  folderId,
  projectId,
  testCaseId
}) =>
  fetchGet(
    `/api/v1/projects/${projectId}/folder/${folderId}/test-cases/${testCaseId}/detail`
  );

export const getTagsAPI = async ({ projectId }) =>
  fetchGet(`/api/v1/projects/${projectId}/test-case/tags`);

export const verifyTagAPI = async ({ projectId, tags }) =>
  fetchPost(`/api/v1/projects/${projectId}/test-case/tags/verify_tag`, {
    tags
  });

export const moveTestCasesBulk = async ({
  projectId,
  folderId,
  newParentFolderId,
  testCaseIds
}) =>
  fetchPost(
    `/api/v1/projects/${projectId}/folder/${folderId}/test-cases/bulk-move`,
    {
      test_case: {
        ids: testCaseIds,
        folder_id: newParentFolderId
      }
    }
  );

export const deleteTestCasesBulk = async ({
  projectId,
  folderId,
  testCaseIds
}) =>
  fetchPost(
    `/api/v1/projects/${projectId}/folder/${folderId}/test-cases/bulk-delete`,
    {
      test_case: {
        ids: testCaseIds
      }
    }
  );

export const editTestCasesBulk = async ({
  projectId,
  folderId,
  testCaseIds,
  data
}) =>
  fetchPost(
    `/api/v1/projects/${projectId}/folder/${folderId}/test-cases/bulk-edit`,
    {
      test_case: {
        ...data,
        ids: testCaseIds
      }
    }
  );
