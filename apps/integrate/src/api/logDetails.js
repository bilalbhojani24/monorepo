import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { URLS } from './constants';

const getLogDetails = ({ logUUID }) =>
  axios
    .get(URLS.LOG_DETAILS, {
      params: {
        log_uuid: logUUID
      }
    })
    .then((response) => response.data.data);

export const getLogDetailsThunk = createAsyncThunk(
  'getLogDetails',
  getLogDetails
);
