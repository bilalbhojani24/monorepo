import { fetchGet } from './_utils/fetch';

export const getFolders = async ({ projectId }) =>
  await fetchGet(`/api/v1/projects/${projectId}/repository`);
