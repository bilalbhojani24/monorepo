import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from './axiosInstance';
import { URLS } from './constants';

const getIntegrations = ({ projectId, componentKey }) =>
  axios
    .get(URLS.LIST_INTEGRATIONS, {
      params: {
        project_id: projectId,
        ui_component_key: componentKey
      }
    })
    .then((response) => response.data);

export const getIntegrationsThunk = createAsyncThunk(
  'getListOfIntegrations',
  getIntegrations
);