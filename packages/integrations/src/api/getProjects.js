import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from './axiosInstance';
import { URLS } from './constants';

const getProjects = (integrationKey) =>
  axios
    .get(URLS.PROJECTS, {
      params: {
        integration_key: integrationKey
      }
    })
    .then((response) => response.data.data.projects);

export const getProjectsThunk = createAsyncThunk('getProjects', getProjects);
