import { fetchGet, fetchPost } from './_utils/fetch';

export const getTestRuns = async ({ projectId, isClosed, page }) =>
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
