import { fetchGet, fetchPost } from './_utils/fetch';

export const getProjects = async () => await fetchGet('/api/v1/projects');

export const addProjects = async (payload) =>
  // const data = payload;
  await fetchPost(`/api/v1/projects`, payload);
