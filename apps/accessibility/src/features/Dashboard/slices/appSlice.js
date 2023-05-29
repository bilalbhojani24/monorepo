import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'dashboardAppSlice',
  initialState: {
    user: null,
    banner: {
      showBanner: true,
      trialState: 'expired'
    }
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setShowBanner: (state, { payload }) => {
      state.banner.showBanner = payload;
    }
  }
});

export const { setUser, setShowBanner } = actions;

export default reducer;
