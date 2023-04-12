import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from './axiosInstance';
import { URLS } from './constants';

export const getTokenConnectionForTool = ({
  integrationKey,
  data: fieldsData
}) =>
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
    .then((response) => response.data)
    .catch((error) => error.response.data);

export const getTokenConnectionForToolThunk = createAsyncThunk(
  'getTokenConnectionForTool',
  getTokenConnectionForTool
);
