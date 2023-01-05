import { fetchGet } from './_utils/fetch';

export const getFolders = async ({ projectId }) => {
  const data = await fetchGet(`/api/v1/projects/${projectId}/repository`);
  return data;
};
