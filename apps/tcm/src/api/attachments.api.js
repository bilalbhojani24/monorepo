import { fetchPost } from './_utils/fetch';

export const uploadFilesAPI = async ({ projectId, payload }) =>
  fetchPost(`/api/v1/projects/${projectId}/generic/attachments`, payload);

export const imageUploadRTEHandlerAPI = async ({ projectId, blobInfo }) => {
  const formData = new FormData();
  const files = blobInfo.blob();
  formData.append('image', files);

  const res = await fetchPost(
    `/api/v1/projects/${projectId}/generic/rte_upload`,
    formData
  );

  return res.data.url;
};
