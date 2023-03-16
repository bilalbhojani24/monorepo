import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  previousUserSessions: []
};

export const testHistorySlice = createSlice({
  name: 'testHistory',
  initialState,
  reducers: {
    setPreviousUserSessions: (state, action) => {
      state.previousUserSessions = action.payload;
    }
  }
});

// reducers
export const getPreviousUserSessions = (state) =>
  state.testHistory.previousUserSessions;

// Action creators are generated for each case reducer function
export const { setPreviousUserSessions } = testHistorySlice.actions;

export default testHistorySlice.reducer;
