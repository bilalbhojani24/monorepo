import { fetchGet, fetchPost } from './_utils/fetch';

export const getFolders = async ({ projectId }) =>
  fetchGet(`/api/v1/projects/${projectId}/repository`);

export const getSubFolders = async ({ projectId, folderId }) =>
  fetchGet(`/api/v1/projects/${projectId}/folder/${folderId}`);

export const addFolder = async ({ projectId, payload }) =>
  fetchPost(`/api/v1/projects/${projectId}/repository/mkdir`, {
    folder: payload
  });

export const addSubFolder = async ({ projectId, folderId, payload }) =>
  fetchPost(`/api/v1/projects/${projectId}/folder/${folderId}/mkdir`, {
    folder: payload
  });

export const deleteFolder = async ({ projectId, folderId }) =>
  fetchPost(`/api/v1/projects/${projectId}/folder/${folderId}/rm`);
