import { setStorage } from '@browserstack/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBuildInfoFromUuidApi } from 'api/builds';
import { getProjectsListAPI } from 'api/projectlist';
import { PROJECT_NORMALISED_NAME_IDENTIFIER } from 'constants/common';
import isEmpty from 'lodash/isEmpty';

export const getProjectsList = createAsyncThunk(
  'sidebar/getProjectsList',
  async (data) => {
    try {
      const response = await getProjectsListAPI();
      return {
        list: response.data,
        projectNormalisedName: data?.projectNormalisedName
      };
    } catch (err) {
      return null;
    }
  }
);

export const getBuildInfoFromUuid = createAsyncThunk(
  'base/getBuildInfoFromUuid',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getBuildInfoFromUuidApi(data.uuid);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const { actions, reducer } = createSlice({
  name: 'global',
  initialState: {
    projects: {
      isLoading: true,
      list: [],
      active: {
        id: 0,
        name: 'Select a project',
        normalisedName: ''
      }
    },
    buildInfo: null
  },
  reducers: {
    setProjectList: (state, { payload }) => {
      state.projects.list = payload;
    },
    setActiveProject: (state, { payload }) => {
      state.projects.active = {
        id: payload.id,
        name: payload.name,
        normalisedName: payload.normalisedName
      };
      localStorage.setItem(
        PROJECT_NORMALISED_NAME_IDENTIFIER,
        state.projects.active.normalisedName
      );
    },
    updateProjectList: (state, { payload }) => {
      if (!isEmpty(payload)) {
        state.projects.list = [payload, ...state.projects.list];
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjectsList.pending, (state) => {
        state.projects.isLoading = true;
      })
      .addCase(getProjectsList.rejected, (state) => {
        state.projects.isLoading = false;
      })
      .addCase(getProjectsList.fulfilled, (state, { payload }) => {
        const { list, projectNormalisedName } = payload;
        state.projects.list = list;
        if (list.length) {
          const foundProject = list.find(
            (item) => item.normalisedName === projectNormalisedName
          );
          if (foundProject) {
            state.projects.active = {
              id: foundProject.id,
              name: foundProject.name,
              normalisedName: foundProject.normalisedName
            };
          } else {
            state.projects.active = {
              id: list[0].id,
              name: list[0].name,
              normalisedName: list[0].normalisedName
            };
          }
          setStorage(
            PROJECT_NORMALISED_NAME_IDENTIFIER,
            state.projects.active.normalisedName
          );
        }
        state.projects.isLoading = false;
      })
      .addCase(getBuildInfoFromUuid.pending, (state) => {
        state.buildInfo = null;
      })
      .addCase(getBuildInfoFromUuid.rejected, (state) => {
        state.buildInfo = null;
      })
      .addCase(getBuildInfoFromUuid.fulfilled, (state, { payload }) => {
        state.buildInfo = {
          projectNormalisedName: payload.projectNormalisedName,
          buildNormalisedName: payload.buildNormalisedName,
          buildSerialId: payload.buildSerialId
        };
      });
  }
});

export const { setProjectList, setActiveProject, updateProjectList } = actions;

export default reducer;
