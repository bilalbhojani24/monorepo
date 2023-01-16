import { fetchGet, fetchPost } from './_utils/fetch';

export const getTestRuns = async ({ projectId }) =>
  fetchGet(`/api/v1/projects/${projectId}/test-runs`);

export const addTestRun = async ({ projectId, payload }) =>
  fetchPost(`/api/v1/projects/${projectId}/test-runs/`, payload);
