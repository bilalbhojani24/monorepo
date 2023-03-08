import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { URLS } from './constants';

const getProjects = ({ projectId, integrationkey }) =>
  axios({
    method: 'get',
    url: URLS.LIST_INTEGRATIONS,
    params: {
      project_id: projectId,
      integrationkey
    }
  }).then((response) => response.data);

export const getProjectsThunk = createAsyncThunk('getProjects', getProjects);
