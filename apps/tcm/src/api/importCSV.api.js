import { fetchGet, fetchPost } from './_utils/fetch';

export const downloadSampleCSV = async () =>
  // eslint-disable-next-line no-return-await
  await fetchGet('/api/v1/import/csv/sample');

export const getCSVConfigurations = async ({ projectId, folderId }) => {
  let baseUrl = '/api/v1/import/csv/configurations';

  if (projectId && folderId)
    baseUrl = `${baseUrl}?project_id=${projectId}&folder_id=${folderId}`;
  else if (projectId && projectId !== 'new')
    baseUrl = `${baseUrl}?project_id=${projectId}`;

  return fetchGet(baseUrl);
};

export const postCSV = async (payload) =>
  // eslint-disable-next-line no-return-await
  await fetchPost('/api/v1/import/custom/csv/', payload);

// eslint-disable-next-line camelcase
export const getFieldMapping = async ({
  importId,
  field,
  projectId,
  // eslint-disable-next-line camelcase
  mapped_field
}) => {
  if (projectId && projectId !== 'new')
    return fetchGet(
      // eslint-disable-next-line camelcase
      `/api/v1/import/custom/csv/${importId}/fetch_values?field=${field}&mapped_field=${mapped_field}&project_id=${projectId}`
    );
  return fetchGet(
    // eslint-disable-next-line camelcase
    `/api/v1/import/custom/csv/${importId}/fetch_values?field=${field}&mapped_field=${mapped_field}`
  );
};

export const getUsers = async (projectId) =>
  // eslint-disable-next-line no-return-await
  await fetchGet(`/api/v1/projects/${projectId}/users`);

export const postMappingData = async ({ importId, payload }) =>
  // eslint-disable-next-line no-return-await
  await fetchPost(`/api/v1/import/custom/csv/${importId}/preview`, payload);

export const startCSVImport = async ({ importId, retryImport, payload }) =>
  // eslint-disable-next-line no-return-await
  await fetchPost(
    `/api/v1/import/custom/csv/${importId}/insert?retry=${retryImport}`,
    payload
  );

export const downloadReport = async (importId) =>
  // eslint-disable-next-line no-return-await
  await fetchGet(`/api/v1/import/${importId}/error_file`);

export const cancelImport = async (importId) =>
  // eslint-disable-next-line no-return-await
  await fetchPost(`/api/v1/import/custom/csv/${importId}/cancel`);

export const getSystemTags = async (projectId) =>
  // eslint-disable-next-line no-return-await
  await fetchGet(`/api/v1/projects/${projectId}/test-case/tags`);

export const getImportResultAPI = async (importId) =>
  fetchGet(`/api/v1/import/quick/${importId}/result`);
