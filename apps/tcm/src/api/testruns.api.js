import { fetchGet, fetchPost } from './_utils/fetch';

export const getTestRunsAPI = async ({ projectId, isClosed, page }) =>
  fetchGet(
    `/api/v1/projects/${projectId}/test-runs${isClosed ? '/closed' : ''}`,
    {
      params: { p: page }
    }
  );

export const addTestRunAPI = async ({ projectId, payload }) =>
  fetchPost(`/api/v1/projects/${projectId}/test-runs/`, payload);

export const addTestRunWithoutProjectAPI = async ({ payload }) =>
  fetchPost(`/api/v1/projects/test-runs`, payload);

export const getTagsAPI = async ({ projectId }) =>
  fetchGet(`/api/v1/projects/${projectId}/test-run/tags`);

export const verifyTagAPI = async ({ projectId, tags }) =>
  fetchPost(`/api/v1/projects/${projectId}/test-run/tags/verify_tag`, {
    tags
  });

export const getTestRunDetailsAPI = async ({
  projectId,
  testRunId,
  isFullDetails = true // to be updated later once API is fine
}) =>
  fetchGet(`/api/v1/projects/${projectId}/test-runs/${testRunId}/detail`, {
    params: { case_details: isFullDetails }
  });

export const editTestRunAPI = async ({ projectId, payload, testRunId }) =>
  fetchPost(
    `/api/v1/projects/${projectId}/test-runs/${testRunId}/edit`,
    payload
  );

export const deleteTestRunAPI = async ({ projectId, testRunId }) =>
  fetchPost(`/api/v1/projects/${projectId}/test-runs/${testRunId}/delete`);

export const closeTestRunAPI = async ({ projectId, testRunId }) =>
  fetchPost(`/api/v1/projects/${projectId}/test-runs/${testRunId}/close`);

export const assignTestRunAPI = async ({ projectId, ownerId, testRunId }) =>
  fetchPost(`/api/v1/projects/${projectId}/test-runs/${testRunId}/assign`, {
    test_run: { owner: ownerId }
  });

export const getTestRunsTestCasesAPI = async ({
  projectId,
  testRunId,
  page = 1
}) =>
  fetchGet(`/api/v1/projects/${projectId}/test-runs/${testRunId}/test-cases`, {
    params: { p: page }
  });

export const addTestResultAPI = async ({
  projectId,
  testCaseId,
  testRunId,
  payload
}) =>
  fetchPost(
    `/api/v1/projects/${projectId}/test-runs/${testRunId}/test-cases/${testCaseId}/test-results`,
    {
      test_result: payload
    }
  );

export const getTestResultsAPI = async ({ projectId, testRunId, testCaseId }) =>
  fetchGet(
    `/api/v1/projects/${projectId}/test-runs/${testRunId}/test-cases/${testCaseId}/test-results`
  );

// --------- bulk options ------------------------------

export const removeTCFromTRBulkAPI = async ({
  projectId,
  ids,
  testRunId,
  page = 1
}) =>
  fetchPost(
    `/api/v1/projects/${projectId}/test-runs/${testRunId}/test-cases/unlink?p=${page}`,
    {
      test_case_ids: ids
    }
  );

export const assignToTCBulkAPI = async ({
  projectId,
  ids,
  assigneeId,
  testRunId,
  page = 1
}) =>
  fetchPost(
    `/api/v1/projects/${projectId}/test-runs/${testRunId}/test-cases/bulk_assign?p=${page}`,
    {
      test_case_ids: ids,
      assignee_id: assigneeId
    }
  );

export const addResultTCBulkAPI = async ({
  projectId,
  ids,
  status,
  testRunId,
  issues,
  page = 1
}) =>
  fetchPost(
    `/api/v1/projects/${projectId}/test-runs/${testRunId}/test-cases/edit?p=${page}`,
    {
      test_case_ids: ids,
      status,
      issues
    }
  );
