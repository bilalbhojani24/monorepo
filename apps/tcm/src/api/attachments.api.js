import { fetchPost } from './_utils/fetch';

export const uploadFilesAPI = async ({ projectId, payload }) =>
  fetchPost(`/api/v1/projects/${projectId}/generic/attachments`, payload);
