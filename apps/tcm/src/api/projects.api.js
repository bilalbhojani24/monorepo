import { fetchGet, fetchPost } from './_utils/fetch';

export const getProjectsAPI = async (page = 1) =>
  fetchGet('/api/v1/projects', { params: { p: page } });

export const getProjectsMinifiedAPI = async () =>
  fetchGet('/api/v1/projects/minify');

export const addProjectsAPI = async (payload) =>
  fetchPost(`/api/v1/projects`, payload);

export const editProjectAPI = async (projectId, payload) =>
  fetchPost(`/api/v1/projects/${projectId}/edit`, payload);

export const deleteProjectAPI = async (projectId) =>
  fetchPost(`/api/v1/projects/${projectId}/delete`);

export const getUsersOfProjectAPI = async (projectId) =>
  fetchGet(`/api/v1/projects/${projectId}/users`);

export const getCustomFieldsAPI = async (projectId) => {
  if (projectId === 'new') return fetchGet('/api/v1/projects/form-fields');
  return fetchGet(`/api/v1/projects/${projectId}/form-fields`);
};
