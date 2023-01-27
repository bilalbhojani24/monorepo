import { fetchGet, fetchPost } from './_utils/fetch';

export const getFolders = async ({ projectId }) =>
  fetchGet(`/api/v1/projects/${projectId}/repository`);

export const getSubFolders = async ({ projectId, folderId }) =>
  fetchGet(`/api/v1/projects/${projectId}/folder/${folderId}?cases=false`);

export const addFolder = async ({ projectId, payload }) =>
  fetchPost(`/api/v1/projects/${projectId}/repository/mkdir`, {
    folder: payload
  });

export const renameFolder = async ({ projectId, folderId, payload }) =>
  fetchPost(`/api/v1/projects/${projectId}/folder/${folderId}/rename`, payload);

export const addSubFolder = async ({ projectId, folderId, payload }) =>
  fetchPost(`/api/v1/projects/${projectId}/folder/${folderId}/mkdir`, {
    folder: payload
  });

export const deleteFolder = async ({ projectId, folderId }) =>
  fetchPost(`/api/v1/projects/${projectId}/folder/${folderId}/rm`);

export const moveFolder = async ({
  projectId,
  folderId,
  newParentFolderId,
  isCopy
}) =>
  fetchPost(`/api/v1/projects/${projectId}/folder/${folderId}/mv`, {
    new_base_folder_id: newParentFolderId,
    user_action: isCopy ? 'copy_folder' : 'move_folder'
  });
