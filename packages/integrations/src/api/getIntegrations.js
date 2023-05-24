import { createAsyncThunk } from '@reduxjs/toolkit';

import { setUserId } from '../features/slices/userAuthSlice';

import axios from './axiosInstance';
import { URLS } from './constants';

const getIntegrations = ({ projectId, componentKey }, { dispatch }) =>
  axios
    .get(URLS.LIST_INTEGRATIONS, {
      params: {
        project_id: projectId,
        ui_component_key: componentKey
      }
    })
    .then((response) => response.data)
    .then((payload) => {
      const { data: { user_id: userId } = {} } = payload || {};
      dispatch(setUserId(userId));
      return payload;
    });

export const getIntegrationsThunk = createAsyncThunk(
  'getListOfIntegrations',
  getIntegrations
);
