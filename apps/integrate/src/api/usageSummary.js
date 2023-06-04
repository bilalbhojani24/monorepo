import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { URLS } from './constants';

const getUsageSummary = ({ to, from, configurationIds }) =>
  axios
    .get(URLS.USAGE_SUMMARY, {
      params: {
        to,
        from,
        configuration_ids: configurationIds
      }
    })
    .then((response) => response.data.data);

export const getUsageSummaryThunk = createAsyncThunk(
  'getUsageSummary',
  getUsageSummary
);
