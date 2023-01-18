import { fetchGet, fetchPost } from './_utils/fetch';

export const getProjectsAPI = async () => fetchGet('/api/v1/projects');

export const addProjectsAPI = async (payload) =>
  fetchPost(`/api/v1/projects`, payload);

export const editProjectAPI = async (projectId, payload) =>
  fetchPost(`/api/v1/projects/${projectId}/edit`, payload);

export const deleteProjectAPI = async (projectId) =>
  fetchPost(`/api/v1/projects/${projectId}/delete`);

export const getUsersOfProjectAPI = async (projectId) =>
  fetchGet(`/api/v1/projects/${projectId}/users`);
