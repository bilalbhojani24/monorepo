import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { configurationsSelector } from 'globalSlice/index';
import { isEmpty } from 'lodash';

import { URLS } from './constants';

export const getConfigurations = (_, { getState }) => {
  const configurationInState = configurationsSelector(getState());
  if (!isEmpty(configurationInState)) {
    return Promise.resolve(configurationInState);
  }
  return axios.get(URLS.CONFIGURATIONS).then((response) => response.data.data);
};

export const getConfigurationsThunk = createAsyncThunk(
  'getConfigurations',
  getConfigurations
);
