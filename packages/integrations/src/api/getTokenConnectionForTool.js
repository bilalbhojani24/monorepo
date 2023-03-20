import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { setHasIntegrated } from '../features/slices/integrationsSlice';

import { URLS } from './constants';

export const getTokenConnectionForTool = (
  { integrationKey, data: fieldsData },
  { dispatch }
) =>
  axios
    .post({
      url: URLS.TOOL_API_TOKEN_CONNECTION,
      data: {
        integration_key: integrationKey,
        auth_info: fieldsData
      }
    })
    .then((response) => {
      dispatch(setHasIntegrated(integrationKey));
      return response.data;
    });

export const getTokenConnectionForToolThunk = createAsyncThunk(
  'getTokenConnectionForTool',
  getTokenConnectionForTool
);
