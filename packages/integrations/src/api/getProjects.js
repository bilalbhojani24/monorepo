import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { URLS } from './constants';

const getProjects = (integrationKey) =>
  axios({
    method: 'get',
    url: URLS.PROJECTS,
    params: {
      integrationKey
    }
  }).then((response) => response.data);

export const getProjectsThunk = createAsyncThunk('getProjects', getProjects);
