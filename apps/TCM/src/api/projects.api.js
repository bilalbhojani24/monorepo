import { fetchGet } from './_utils/fetch';

export const getProjects = async () => {
  const data = await fetchGet('/api/v1/projects');
  return data;
};
