import { fetchGet, fetchPost } from './_utils/fetch';

export const getFolders = async ({ projectId }) =>
  fetchGet(`/api/v1/projects/${projectId}/repository`);

export const getSubFolders = async ({ projectId, folderId }) =>
  fetchGet(`/api/v1/projects/${projectId}/folder/${folderId}`);

export const addFolder = async ({ projectId, payload }) => {
  const data = {
    folder: payload
  };
  return fetchPost(`/api/v1/projects/${projectId}/repository/mkdir`, data);
};
