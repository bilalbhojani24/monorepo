import { createAsyncThunk } from '@reduxjs/toolkit';

import { getIconForUrl, setIconForUrl } from '../common/slices/iconSlice';

import axios from './axiosInstance';

export const fetchBase64Icon = ({ url }, { getState, dispatch }) => {
  const iconForUrl = getIconForUrl(getState(), url);
  if (iconForUrl) {
    return iconForUrl;
  }

  return axios
    .get(url, { responseType: 'arraybuffer' })
    .then((response) => response.data)
    .then((arrBuffer) => {
      try {
        const base64Image = btoa(
          new Uint8Array(arrBuffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        const imageSrc = `data:image/png;base64,${base64Image}`;
        dispatch(setIconForUrl({ url, image: imageSrc }));
        return imageSrc;
      } catch (err) {
        return null;
      }
    });
};

export const fetchBase64IconThunk = createAsyncThunk(
  'fetchBase64Icon',
  fetchBase64Icon
);
