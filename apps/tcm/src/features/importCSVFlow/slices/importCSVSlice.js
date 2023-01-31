import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  //   testRailsCred: {
  //     email: '',
  //     host: '',
  //     key: ''
  //   },
  //   zephyrCred: {
  //     zephyr_key: '',
  //     email: '',
  //     jira_key: '',
  //     host: ''
  //   },
  //   connectionStatusMap: { testrails: '', zephyr: '' },
  //   selectedRadioIdMap: { testrails: '', zephyr: '' },
  //   projectsForTestManagementImport: [],
  currentCSVScreen: 'uploadFile',
  importCSVSteps: []
  //   currentTestManagementTool: ''
};

const importCSVSlice = createSlice({
  name: 'importCSV',
  initialState,
  reducers: {
    // setTestRailsCred: (state, { payload }) => {
    //   state.testRailsCred[payload.key] = payload.value;
    // },
    // setProjectForTestManagementImport: (state, { payload }) => {
    //   state.projectsForTestManagementImport = payload;
    // },
    setCSVCurrentScreen: (state, { payload }) => {
      state.currentCSVScreen = payload;
    },
    setCSVImportSteps: (state, { payload }) => {
      state.importCSVSteps = payload;
    }
    // setConnectionStatusMap: (state, { payload }) => {
    //   state.connectionStatusMap[payload.key] = payload.value;
    //   if (payload.key === 'testrails') {
    //     state.zephyrCred = initialState.zephyrCred;
    //     state.connectionStatusMap.zephyr = '';
    //     state.selectedRadioIdMap.zephyr = '';
    //   } else if (payload.key === 'zephyr') {
    //     state.testRailsCred = initialState.testRailsCred;
    //     state.connectionStatusMap.testrails = '';
    //     state.selectedRadioIdMap.testrails = '';
    //   }
    // },
    // setSelectedRadioIdMap: (state, { payload }) => {
    //   state.selectedRadioIdMap[payload.key] = payload.value;
    // },
    // setCurrentTestManagementTool: (state, { payload }) => {
    //   state.currentTestManagementTool = payload;
    // },
    // setZephyrCred: (state, { payload }) => {
    //   state.zephyrCred[payload.key] = payload.value;
    // }
  }
});

export const {
  //   setCurrentTestManagementTool,
  setCSVCurrentScreen,
  //   setTestRailsCred,
  //   setZephyrCred,
  //   setProjectForTestManagementImport,
  setCSVImportSteps
  //   setConnectionStatusMap,
  //   setSelectedRadioIdMap
} = importCSVSlice.actions;
export default importCSVSlice.reducer;
