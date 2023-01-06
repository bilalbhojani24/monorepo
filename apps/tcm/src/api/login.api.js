import { fetchGet } from './_utils/fetch';

export const login = async () => {
  const data = await fetchGet('/api/v1/user/profile', { withCredentials: true });
  return data;
};
