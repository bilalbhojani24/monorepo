import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { URLS } from './constants';

export const getConfigurations = () =>
  axios.get(URLS.CONFIGURATIONS).then((response) => response.data.data);

export const getConfigurationsThunk = createAsyncThunk(
  'getConfigurations',
  getConfigurations
);
