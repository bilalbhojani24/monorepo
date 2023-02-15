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

export const getTagsAPI = async ({ projectId }) =>
  fetchGet(`/api/v1/projects/${projectId}/test-run/tags`);

export const verifyTagAPI = async ({ projectId, tags }) =>
  fetchPost(`/api/v1/projects/${projectId}/test-run/tags/verify_tag`, {
    tags
  });

export const getTestRunDetailsAPI = async ({
  projectId,
  testRunId,
  isFullDetails = false
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
