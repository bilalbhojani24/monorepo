import { fetchPost } from './_utils/fetch';

export const testConnection = async (payload) =>
  await fetchPost(`/api/v1/import/testrail/quick/test-connection`, payload);
