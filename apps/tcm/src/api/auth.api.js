import { fetchGet } from './_utils/fetch';

export const authUser = async () => fetchGet(`/api/v1`);
