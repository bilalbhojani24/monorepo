import { fetchGet, fetchPost } from './_utils/fetch';

export const getTestRuns = async ({ projectId }) =>
  await fetchGet(`/api/v1/projects/${projectId}/test-runs`);

export const addTestRun = async ({ projectId, payload }) => {
  console.log('payload before api', projectId, payload);
  return await fetchPost(`/api/v1/projects/${projectId}/test-runs/`, payload);
};
