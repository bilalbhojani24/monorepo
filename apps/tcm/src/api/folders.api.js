import { fetchGet, fetchPost } from './_utils/fetch';

export const getFolders = async ({ projectId }) =>
  await fetchGet(`/api/v1/projects/${projectId}/repository`);

export const addFolder = async ({ projectId, payload }) => {
  const data = {
    folder: payload,
  };
  return await fetchPost(
    `/api/v1/projects/${projectId}/repository/mkdir`,
    data,
  );
};
