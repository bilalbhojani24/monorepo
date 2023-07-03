import { fetchGet, fetchPost } from './_utils/fetch';

export const getJIRAConfigAPI = async () =>
  fetchGet(`/api/v1/integration/jira/configuration`);

export const requestAccessAPI = async () =>
  fetchPost(`/api/v1/request_group_access`);

// this api is used to notify that access has raised for user (freemium a group has more than 5 users)
export const requestTMAccessAPI = async () =>
  fetchPost('/api/v1/request_tcm_access');
