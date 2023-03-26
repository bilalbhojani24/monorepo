import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { setGlobalAlert } from '../common/slices/globalAlertSlice';
import { setHasIntegrated } from '../features/slices/integrationsSlice';

import { URLS } from './constants';

export const getTokenConnectionForTool = (
  { integrationKey, data: fieldsData },
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
    })
    .catch((err) => {
      dispatch(
        setGlobalAlert({
          kind: 'error',
          message: `There was some problem connecting to ${integrationKey} software`
        })
      );
      throw err;
    });

export const getTokenConnectionForToolThunk = createAsyncThunk(
  'getTokenConnectionForTool',
  getTokenConnectionForTool
);
