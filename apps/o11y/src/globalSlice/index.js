import { getStorage, setStorage } from '@browserstack/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBuildInfoFromUuidApi } from 'api/builds';
import { getProjectsListAPI, initO11y } from 'api/global';
import { PROJECT_NORMALISED_NAME_IDENTIFIER } from 'constants/common';
import isEmpty from 'lodash/isEmpty';

const SLICE_NAME = 'global';

export const getInitialData = createAsyncThunk(
  `${SLICE_NAME}/getInitialData`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await initO11y();
      return response.data;
    } catch (err) {
      return rejectWithValue(null);
    }
  }
);

export const getProjectsList = createAsyncThunk(
  `${SLICE_NAME}/getProjectsList`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await getProjectsListAPI();
      return {
        list: response.data,
        projectNormalisedName: data?.projectNormalisedName,
        setFirstProjectActive: data?.setFirstProjectActive || false
      };
    } catch (err) {
      return rejectWithValue(null);
    }
  }
);

export const getBuildInfoFromUuid = createAsyncThunk(
  `${SLICE_NAME}/getBuildInfoFromUuid`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await getBuildInfoFromUuidApi(data.uuid);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const initO11yProduct =
  ({ params, setFirstProjectActive }) =>
  (dispatch) =>
    Promise.all([
      dispatch(getInitialData())
        .unwrap()
        .catch((err) => {
          throw err;
        }),
      dispatch(
        getProjectsList({
          projectNormalisedName: encodeURI(
            params?.projectNormalisedName ||
              getStorage(PROJECT_NORMALISED_NAME_IDENTIFIER)
          ),
          setFirstProjectActive
        })
      )
        .unwrap()
        .catch((err) => {
          throw err;
        })
    ])
      .then((res) => Promise.resolve(res))
      .catch(() => null);

const { actions, reducer } = createSlice({
  name: SLICE_NAME,
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
    buildInfo: null,
    initData: {
      isLoading: true,
      data: null
    }
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
    setHasAcceptedTnC: (state, { payload }) => {
      state.initData.data.hasAcceptedTnC = payload;
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
        const { list, projectNormalisedName, setFirstProjectActive } = payload;
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
            setStorage(
              PROJECT_NORMALISED_NAME_IDENTIFIER,
              state.projects.active.normalisedName
            );
          } else if (setFirstProjectActive) {
            state.projects.active = {
              id: list[0].id,
              name: list[0].name,
              normalisedName: list[0].normalisedName
            };
            setStorage(
              PROJECT_NORMALISED_NAME_IDENTIFIER,
              state.projects.active.normalisedName
            );
          }
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
      })
      .addCase(getInitialData.fulfilled, (state, { payload }) => {
        state.initData = {
          isLoading: false,
          data: payload
        };
      });
  }
});

export const {
  setProjectList,
  setActiveProject,
  setHasAcceptedTnC,
  updateProjectList
} = actions;

export default reducer;
