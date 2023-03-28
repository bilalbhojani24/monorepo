import { createSlice } from '@reduxjs/toolkit';

import { LOG_LEVELS, LOG_TYPES } from '../constants';

const LOG_LEVEL_FILTER_MAPPING = {
  [LOG_TYPES.TEST_LOG]: [
    LOG_LEVELS.DEBUG,
    LOG_LEVELS.INFO,
    LOG_LEVELS.WARNING,
    LOG_LEVELS.ERROR,
    LOG_LEVELS.WARN,
    LOG_LEVELS.TRACE,
    LOG_LEVELS.FATAL
  ],
  [LOG_TYPES.TEXT_LOGS]: [
    LOG_LEVELS.INFO,
    LOG_LEVELS.ERROR,
    LOG_LEVELS.WARNING
  ],
  [LOG_TYPES.TEST_SCREENSHOT]: [LOG_LEVELS.DEBUG],
  [LOG_TYPES.CONSOLE_LOGS]: [
    LOG_LEVELS.ERROR,
    LOG_LEVELS.WARNING,
    LOG_LEVELS.FATAL,
    LOG_LEVELS.SEVERE
  ],
  [LOG_TYPES.DEVICE_LOGS]: [
    LOG_LEVELS.ERROR,
    LOG_LEVELS.WARNING,
    LOG_LEVELS.FATAL,
    LOG_LEVELS.SEVERE
  ],
  [LOG_TYPES.NETWORK_LOGS]: [LOG_LEVELS.ERROR],
  [LOG_TYPES.HTTP]: [LOG_LEVELS.ERROR],
  [LOG_TYPES.APPLICATION_LOGS]: [LOG_LEVELS.ERROR]
};

const { actions, reducer } = createSlice({
  name: 'testDetails',
  initialState: {
    isDetailsVisible: false,
    showDetailsFor: '',
    exceptions: [],
    active_log_level: LOG_LEVEL_FILTER_MAPPING
  },
  reducers: {
    setIsDetailsVisible: (state, { payload }) => {
      state.isDetailsVisible = payload;
    },
    setShowDetailsFor: (state, { payload }) => {
      state.showDetailsFor = payload;
    },
    setExceptions: (state, { payload }) => {
      state.exceptions = payload;
    },
    clearExceptions: (state) => {
      state.exceptions = [];
    },
    setActiveLogLevels: (state, { payload }) => {
      state.active_log_level[payload.logType] = payload.logLevels;
    },
    resetDefaultLogLevels: (state) => {
      state.active_log_level = { ...LOG_LEVEL_FILTER_MAPPING };
    }
  }
});

export const {
  setIsDetailsVisible,
  setShowDetailsFor,
  setExceptions,
  clearExceptions,
  setActiveLogLevels,
  resetDefaultLogLevels
} = actions;

export default reducer;
