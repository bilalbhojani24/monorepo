import { fetchGet, fetchPost } from './_utils/fetch';

export const getTestCasesAPI = async ({ folderId, projectId, page }) =>
  fetchGet(`/api/v1/projects/${projectId}/folder/${folderId}/test-cases`, {
    params: { p: page }
  });

// /--------add test cases --------
export const addTestCaseAPI = async ({ projectId, folderId, payload }) =>
  fetchPost(
    `/api/v1/projects/${projectId}/folder/${folderId}/test-cases`,
    payload
  );
export const addTestCaseWithoutProjectAPI = async ({ payload }) =>
  fetchPost(`/api/v1/projects/test-cases`, payload);

export const addTestCaseWithoutFolderAPI = async ({ projectId, payload }) =>
  fetchPost(`/api/v1/projects/${projectId}/repository/test-cases`, payload);

// /--------add test cases ends  --------

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

export const getTestRunDetailsOfTestCaseAPI = async ({
  projectId,
  testCaseId,
  testRunId
}) =>
  fetchGet(
    `/api/v1/projects/${projectId}/test-runs/${testRunId}/test-cases/${testCaseId}/detail`
  );

export const getTestCaseDetailsAPI = async ({
  folderId,
  projectId,
  testCaseId
}) =>
  fetchGet(
    `/api/v1/projects/${projectId}/folder/${folderId}/test-cases/${testCaseId}/detail`
  );

export const moveTestCasesBulkAPI = async ({
  projectId,
  folderId,
  newParentFolderId,
  bulkSelection
}) =>
  fetchPost(
    `/api/v1/projects/${projectId}/folder/${folderId}/test-cases/bulk-move`,
    {
      test_case: {
        ...bulkSelection,
        folder_id: newParentFolderId
      }
    }
  );

export const deleteTestCasesBulkAPI = async ({
  projectId,
  folderId,
  bulkSelection,
  page
}) => {
  if (page) {
    return fetchPost(
      `/api/v1/projects/${projectId}/folder/${folderId}/test-cases/bulk-delete?p=${page}`,
      {
        test_case: bulkSelection
      }
    );
  }
  return fetchPost(
    `/api/v1/projects/${projectId}/folder/${folderId}/test-cases/bulk-delete`,
    {
      test_case: bulkSelection
    }
  );
};

export const editTestCasesBulkAPI = async ({
  projectId,
  folderId,
  bulkSelection,
  data
}) =>
  fetchPost(
    `/api/v1/projects/${projectId}/folder/${folderId}/test-cases/bulk-edit`,
    {
      test_case: {
        ...data,
        ...bulkSelection
      }
    }
  );

export const getTestCasesSearchFilterAPI = async ({ projectId, props = {} }) =>
  fetchGet(`/api/v1/projects/${projectId}/test-cases/search`, {
    params: props
  });

export const getTagsAPI = async ({ projectId }) =>
  fetchGet(`/api/v1/projects/${projectId}/test-case/tags`);

export const verifyTagAPI = async ({ projectId, tags }) =>
  fetchPost(`/api/v1/projects/${projectId}/test-case/tags/verify_tag`, {
    tags
  });

export const deleteTestCasesBulkOnSFAPI = async ({
  projectId,
  bulkSelection,
  qp
}) =>
  fetchPost(
    `/api/v1/projects/${projectId}/test-cases/bulk-delete`,
    {
      test_case: bulkSelection
    },
    {
      params: qp
    }
  );

export const editTestCasesBulkOnSFAPI = async ({
  projectId,
  qp,
  bulkSelection,
  data
}) =>
  fetchPost(
    `/api/v1/projects/${projectId}/test-cases/bulk-edit`,
    {
      test_case: {
        ...data,
        ...bulkSelection
      }
    },
    {
      params: qp
    }
  );

export const moveTestCasesBulkOnSFAPI = async ({
  projectId,
  qp,
  newParentFolderId,
  bulkSelection
}) =>
  fetchPost(
    `/api/v1/projects/${projectId}/test-cases/bulk-move`,
    {
      test_case: {
        ...bulkSelection,
        folder_id: newParentFolderId
      }
    },
    {
      params: qp
    }
  );
