import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  previousUserSessions: []
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setPreviousUserSessions: (state, action) => {
      state.previousUserSessions = action.payload;
    }
  }
});

// reducers
export const getPreviousUserSessions = (state) =>
  state.home.previousUserSessions;

// Action creators are generated for each case reducer function
export const { setPreviousUserSessions } = homeSlice.actions;

export default homeSlice.reducer;
