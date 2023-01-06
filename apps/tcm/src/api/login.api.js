import { fetchGet } from './_utils/fetch';

export const login = async () => await fetchGet('/api/v1');
