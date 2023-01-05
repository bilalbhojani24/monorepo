import { fetchGet } from './_utils/fetch';

export const getTestCases = async ({ folderId, projectId }) => {
  const data = await fetchGet(`/api/v1/projects/${projectId}/folder/${folderId}/test-cases`);
  return data;
};
