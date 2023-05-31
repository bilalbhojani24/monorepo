import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hasAccess: false,
  noAccessRedirectPath: '/access-denied'
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setHasAccess: (state, action) => {
      state.hasAccess = action.payload;
    },
    setNoAccessRedirectPath: (state, action) => {
      state.noAccessRedirectPath = action.payload;
    }
  }
});

export const { setHasAccess, setNoAccessRedirectPath } = authSlice.actions;

export default authSlice.reducer;

export const hasAccessSelector = (state) => state.auth.hasAccess;
export const noAccessRedirectPathSelector = (state) =>
  state.auth.noAccessRedirectPath;
