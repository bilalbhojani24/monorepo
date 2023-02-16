import { fetchGet, fetchPost } from './_utils/fetch';

export const getSettingsApiKeys = async () =>
    await fetchGet('/api/v1/settings/api-keys');
