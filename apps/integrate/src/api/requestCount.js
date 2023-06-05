import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { URLS } from './constants';

const getRequestCount = ({ from, frequency, configurationIds }) =>
  axios
    .get(URLS.REQUEST_COUNT, {
      params: {
        from,
        frequency,
        configuration_ids: configurationIds
      }
    })
    .then((response) => response.data.data);

export const getRequestCountThunk = createAsyncThunk(
  'getRequestCount',
  getRequestCount
);