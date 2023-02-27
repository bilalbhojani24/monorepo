import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { URLS } from './constants';

const getIntegrations = (projectId, componentKey) =>
  axios.get(URLS.LIST_INTEGRATIONS, {
    params: {
      project_id: projectId,
      ui_component_key: componentKey
    }
  });

export const getIntegrationsThunk = createAsyncThunk(
  'getListOfIntegrations',
  getIntegrations
);
