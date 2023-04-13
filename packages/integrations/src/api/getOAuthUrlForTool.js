import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from './axiosInstance';
import { URLS } from './constants';

export const getOAuthUrlForTool = (integrationKey) =>
  axios
    .get(URLS.TOOL_OAUTH, { params: { integration_key: integrationKey } })
    .then((response) => response.data.redirect_uri);

export const getOAuthUrlForToolThunk = createAsyncThunk(
  'getOAuthUrlForTool',
  getOAuthUrlForTool
);
