import { fetchGet, fetchPost } from './_utils/fetch';

export const getTestRuns = async ({ projectId, isClosed }) =>
  fetchGet(
    `/api/v1/projects/${projectId}/test-runs${isClosed ? '/closed' : ''}`
  );

export const addTestRun = async ({ projectId, payload }) =>
  fetchPost(`/api/v1/projects/${projectId}/test-runs/`, payload);
