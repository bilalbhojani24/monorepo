import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  userAndGroupConfig: null,
  allProjects: [],
  selectedProjectId: null,
  userConfig: {
    jira: null
  },
  isLoading: {
    allProjects: true
  },
  notification: null
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setAllProjects: (state, { payload }) => {
      state.allProjects = payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setSelectedProject: (state, { payload }) => {
      if (payload !== state.selectedProjectId)
        state.selectedProjectId = payload;
    },
    addGlobalProject: (state, { payload }) => {
      state.allProjects = [payload, ...state.allProjects];
    },
    updateGlobalProject: (state, { payload }) => {
      state.allProjects = state.allProjects.map((item) =>
        item.id === payload.id ? payload : item
      );
    },
    setUserConfig: (state, { payload }) => {
      state.userConfig[payload.key] = payload.value;
    },
    deleteGlobalProject: (state, { payload }) => {
      state.allProjects = state.allProjects.filter(
        (item) => item.id !== payload.id
      );
    },
    addNotificaton: (state, { payload }) => {
      state.notification = payload;
    },
    removeNotificaton: (state, { payload }) => {
      if (state.notification?.id === payload) state.notification = null;
    },
    setIsLoadingProps: (state, { payload }) => {
      state.isLoading[payload.key] = payload.value;
    },
    setUserAndGroupConfig: (state, { payload }) => {
      // for amplitude
      state.userAndGroupConfig = payload;
    }
  }
});

export const {
  setIsLoadingProps,
  removeNotificaton,
  addNotificaton,
  setUserConfig,
  setAllProjects,
  setUser,
  setSelectedProject,
  addGlobalProject,
  updateGlobalProject,
  deleteGlobalProject,
  setUserAndGroupConfig
} = globalSlice.actions;

export default globalSlice.reducer;
