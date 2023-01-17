import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  testRailsCred: {
    email: '',
    host: '',
    key: '',
  },
  projectsForTestRailImport: [],
  currentScreen: 'configureTool',
};

const importSlice = createSlice({
  name: 'import',
  initialState,
  reducers: {
    setTestRailsCred: (state, { payload }) => {
      state.testRailsCred[payload.key] = payload.value;
    },
    setProjectForTestRailsImport: (state, { payload }) => {
      state.projectsForTestRailImport = payload;
    },
    setCurrentScreen: (state, { payload }) => {
      state.currentScreen = payload;
    },
  },
});

export const {
  setCurrentScreen,
  setTestRailsCred,
  setProjectForTestRailsImport,
} = importSlice.actions;
export default importSlice.reducer;
