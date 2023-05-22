import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { URLS } from './constants';

const getLogs = ({
  to,
  from,
  page,
  method,
  sortBy,
  pageSize,
  urlSearch,
  statusCode,
  integrations,
  configurationIds
}) =>
  axios
    .get(URLS.LOGS, {
      params: {
        to,
        from,
        page,
        method,
        integrations,
        sort_by: sortBy,
        page_size: pageSize,
        url_search: urlSearch,
        status_code: statusCode,
        configuration_ids: configurationIds
      }
    })
    .then((response) => response.data.data);

export const getLogsThunk = createAsyncThunk('getLogs', getLogs);
