import { fetchGet, fetchPost } from './_utils/fetch';

export const downloadSampleCSV = async () =>
  // eslint-disable-next-line no-return-await
  await fetchGet('/api/v1/import/csv/sample');

export const getCSVConfigurations = async () =>
  // eslint-disable-next-line no-return-await
  await fetchGet('/api/v1/import/csv/configurations');

export const postCSV = async (payload) =>
  // eslint-disable-next-line no-return-await
  await fetchPost('/api/v1/import/custom/csv/', payload);

// eslint-disable-next-line camelcase
export const getFieldMapping = async ({
  importId,
  field,
  projectId,
  mapped_field
}) =>
  // eslint-disable-next-line no-return-await
  await fetchGet(
    // eslint-disable-next-line camelcase
    `/api/v1/import/custom/csv/${importId}/fetch_values?field=${field}&mapped_field=${mapped_field}&project_id=${projectId}`
  );

export const getUsers = async (id) =>
  // eslint-disable-next-line no-return-await
  await fetchGet(`/api/v1/projects/${id}/users`);

export const postMappingData = async ({ importId, payload }) =>
  // eslint-disable-next-line no-return-await
  await fetchPost(`/api/v1/import/custom/csv/${importId}/preview`, payload);

export const startCSVImport = async ({ importId, retryImport, payload }) =>
  // eslint-disable-next-line no-return-await
  await fetchPost(
    `/api/v1/import/custom/csv/${importId}/insert?retry=${retryImport}`,
    payload
  );

export const downloadReport = async (importId) => {
  await fetchGet(`/api/v1/import/${importId}/error_file`);
};

export const cancelImport = async (importId) => {
  await fetchPost(`/api/v1/import/custom/csv/${importId}/cancel`);
};
