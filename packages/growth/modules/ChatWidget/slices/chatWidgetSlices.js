import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import chatWidgetService from '../../../api/chatWidgetServices';

export const fetchChatWidgetInitialData = createAsyncThunk(
  'chatWidget/getInitialData',
  async () => chatWidgetService.getChatWidgetInitialisation()
);

export const { reducer, actions } = createSlice({
  name: 'fetchChatWidgetInitialData',
  initialState: {
    data: null,
    loading: true,
    error: null
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchChatWidgetInitialData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatWidgetInitialData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchChatWidgetInitialData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default reducer;
