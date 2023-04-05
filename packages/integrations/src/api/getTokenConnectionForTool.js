import { createAsyncThunk } from '@reduxjs/toolkit';

import { setHasIntegrated } from '../features/slices/integrationsSlice';

import axios from './axiosInstance';
import { URLS } from './constants';

export const getTokenConnectionForTool = (
  { integrationKey, data: fieldsData, integrationLabel },
  { dispatch }
) =>
  axios
    .post(
      URLS.TOOL_API_TOKEN_CONNECTION,
      {
        auth_info: fieldsData
      },
      {
        params: {
          integration_key: integrationKey
        }
      }
    )
    .then((response) => {
      dispatch(setHasIntegrated(integrationKey));
      return response.data;
    });

export const getTokenConnectionForToolThunk = createAsyncThunk(
  'getTokenConnectionForTool',
  getTokenConnectionForTool
);
