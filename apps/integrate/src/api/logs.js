import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { URLS } from './constants';

const getLogs = ({
  to,
  from,
  page,
  method,
  status,
  pageSize,
  urlSearch,
  integrations,
  configurations
}) =>
  axios
    .get(URLS.LOGS, {
      params: {
        to,
        from,
        page,
        method,
        integrations,
        page_size: pageSize,
        url_search: urlSearch,
        status_code: status,
        configuration_ids: configurations
      }
    })
    .then((response) => response.data.data);

export const getLogsThunk = createAsyncThunk('getLogs', getLogs);
