import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { URLS } from './constants';

export const getOAuthUrlForTool = (integrationKey) =>
  axios
    .get({
      url: `${URLS.TOOL_OAUTH}/${integrationKey}`
    })
    .then((response) => response.data.redirect_uri);

export const getOAuthUrlForToolThunk = createAsyncThunk(
  'getOAuthUrlForTool',
  getOAuthUrlForTool
);
