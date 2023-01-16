import { fetchGet, fetchPost } from './_utils/fetch';

export const getProjectsAPI = async () => fetchGet('/api/v1/projects');

export const addProjectsAPI = async (payload) =>
  // const data = payload;
  fetchPost(`/api/v1/projects`, payload);

export const editProjectAPI = async (projectId, payload) =>
  // const data = payload;
  fetchPost(`/api/v1/projects/${projectId}/edit`, payload);

export const deleteProjectAPI = async (projectId) =>
  // const data = payload;
  fetchPost(`/api/v1/projects/${projectId}/delete`);
