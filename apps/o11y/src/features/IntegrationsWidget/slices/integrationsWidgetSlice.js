import { createSlice } from '@reduxjs/toolkit';

const SLICE_NAME = 'integrationsWidget';

const { reducer, actions } = createSlice({
  name: SLICE_NAME,
  initialState: {
    isOpen: false,
    isLoading: false,
    configuration: {
      position: 'right'
    },
    data: {
      description: '',
      testRunId: ''
    }
  },
  reducers: {
    toggleWidget: (state, { payload }) => {
      state.isOpen = payload;
    },
    setWidgetLoadingState: (state, { payload }) => {
      state.isLoading = payload;
    },
    setWidgetConfiguration: (state, { payload }) => {
      state.configuration = payload;
    },
    setWidgetData: (state, { payload }) => {
      state.data = payload;
    }
  }
});

export const {
  toggleWidget,
  setWidgetData,
  setWidgetLoadingState,
  setWidgetConfiguration
} = actions;

export default reducer;
