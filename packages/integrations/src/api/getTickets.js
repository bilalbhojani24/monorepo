// import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { URLS } from './constants';

export const getTickets = (integrationKey, projectId, format) =>
  axios
    .get(URLS.TICKET, {
      params: {
        integration_key: integrationKey,
        project_id: projectId,
        format
      }
    })
    .then((response) => response.data.data.tickets);

// export const getProjectsThunk = createAsyncThunk('getProjects', getProjects);
