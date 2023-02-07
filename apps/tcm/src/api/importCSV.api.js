import { fetchGet, fetchPost } from './_utils/fetch';

export const downloadSampleCSV = async () =>
  await fetchGet('/api/v1/import/csv/sample');

export const getCSVConfigurations = async () =>
  await fetchGet('/api/v1/import/csv/configurations');

export const postCSV = async (payload) =>
  await fetchPost('/api/v1/import/custom/csv/', payload);

export const getFieldMapping = async ({ importId, field, mapped_field }) =>
  await fetchGet(
    `/api/v1/import/custom/csv/${importId}/fetch_values?field=${field}&mapped_field=${mapped_field}`
  );
