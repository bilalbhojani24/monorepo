import { fetchPost } from './_utils/fetch';

export const uploadFilesAPI = async ({ projectId, payload }) =>
  fetchPost(`/api/v1/projects/${projectId}/generic/attachments`, payload);

export const imageUploadRTEHandlerAPI = async ({ projectId, files }) => {
  const formData = new FormData();
  const file = files[0];
  formData.append('image', file);

  const res = await fetchPost(
    `/api/v1/projects/${projectId}/generic/rte_upload`,
    formData
  );

  return { src: res.data.url, 'data-id': res.data['data-id'] };
};
