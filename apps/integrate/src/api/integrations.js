import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { URLS } from './constants';

export const getIntegrations = () =>
  axios.get(URLS.INTEGRATIONS).then((response) => response);

export const getIntegrationsThunk = createAsyncThunk(
  'getIntegrations',
  getIntegrations
);
