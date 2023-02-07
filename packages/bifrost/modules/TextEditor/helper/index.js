/* eslint-disable prefer-promise-reject-errors */

export const TINYMCE_API_KEY =
  '93wwi5nts6xoefzltfebudmklr0b6iedyvrg115pnula0wkd';

const ASSET_UPLOAD_URL = 'https://api.imgbb.com/1/upload';

export const imageUploadHandler = (blobInfo, progress, assetUploadURL) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open('POST', assetUploadURL || ASSET_UPLOAD_URL);

    xhr.upload.onprogress = (e) => {
      progress((e.loaded / e.total) * 100);
    };

    xhr.onload = () => {
      if (xhr.status === 403) {
        reject({ message: `HTTP Error: ${xhr.status}`, remove: true });
        return;
      }

      if (xhr.status < 200 || xhr.status >= 300) {
        reject(`HTTP Error: ${xhr.status}`);
        return;
      }

      const json = JSON.parse(xhr.response);
      if (!json || typeof json.data.url !== 'string') {
        reject(`Invalid JSON: ${xhr.response}`);
        return;
      }

      resolve(json.data.url);
    };

    xhr.onerror = () => {
      reject(
        `Image upload failed due to a XHR Transport error. Code: ${xhr.status}`
      );
    };

    const formData = new FormData();
    formData.append('image', blobInfo.blob(), blobInfo.filename());
    formData.append('key', '95939cf0c027f2645e60ec39295b6530');

    xhr.send(formData);
  });
