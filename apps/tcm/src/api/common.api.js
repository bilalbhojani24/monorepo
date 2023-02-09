import { fetchGet, fetchPost } from './_utils/fetch';

export const getJIRAConfigAPI = async () =>
  fetchGet(`/api/v1/integration/jira/configuration`);

export const getTagsAPI = async ({ projectId }) =>
  fetchGet(`/api/v1/projects/${projectId}/test-case/tags`);

export const verifyTagAPI = async ({ projectId, tags }) =>
  fetchPost(`/api/v1/projects/${projectId}/test-case/tags/verify_tag`, {
    tags
  });

// export const addTestCaseAPI = async ({ projectId, folderId, payload }) =>
//   fetchPost(
//     `/api/v1/projects/${projectId}/folder/${folderId}/test-cases`,
//     payload,
//   );
