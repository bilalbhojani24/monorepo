import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  uatUrl: '', // user access token URL
  hasToken: false
};

export const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setUATUrl: (state, action) => {
      state.uatUrl = action.payload;
    },
    setHasToken: (state, action) => {
      state.hasToken = action.payload;
    }
  }
});

export const { setUATUrl, setHasToken } = userAuthSlice.actions;

export default userAuthSlice.reducer;

export const uatUrlSelector = (state) => state.userAuth.uatUrl;
export const hasTokenSelector = (state) => state.userAuth.hasToken;
