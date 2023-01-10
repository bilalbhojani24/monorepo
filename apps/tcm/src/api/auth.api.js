import { fetchGet } from './_utils/fetch';

export const authUser = async () =>
  await fetchGet(`https://teststack.bsstag.com/api/v1`);
