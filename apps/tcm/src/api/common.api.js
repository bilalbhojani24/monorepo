import { fetchGet, fetchPost } from './_utils/fetch';

export const getJIRAConfigAPI = async () =>
  fetchGet(`/api/v1/integration/jira/configuration`);

// export const addTestCaseAPI = async ({ projectId, folderId, payload }) =>
//   fetchPost(
//     `/api/v1/projects/${projectId}/folder/${folderId}/test-cases`,
//     payload,
//   );
