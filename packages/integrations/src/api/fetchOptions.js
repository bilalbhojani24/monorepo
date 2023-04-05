import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getOptionsForPath,
  setOptionsForPath
} from '../common/slices/optionsSlice';

import axios from './axiosInstance';

export const fetchOptions = (
  { path, isDefaultOptions },
  { getState, dispatch }
) => {
  // cache only default/dynamic options in redux, avoid search query options
  if (isDefaultOptions) {
    const optionsForPath = getOptionsForPath(getState(), path);
    if (optionsForPath) return optionsForPath;
  }
  return axios
    .get(path)
    .then((response) => response.data.data.options)
    .then((options) => {
      dispatch(setOptionsForPath({ path, options }));
      return options;
    });
};

export const fetchOptionsThunk = createAsyncThunk('fetchOptions', fetchOptions);
