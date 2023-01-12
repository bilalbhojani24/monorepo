import { fetchGet } from './_utils/fetch';

export const getTestRuns = async ({ projectId }) =>
  await fetchGet(`/api/v1/projects/${projectId}/test-runs`);

// export const addTestCase = async ({ projectId, folderId, payload }) =>
//   await fetchPost(
//     `/api/v1/projects/${projectId}/folder/${folderId}/test-cases`,
//     payload,
//   );
