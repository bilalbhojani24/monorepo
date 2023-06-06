import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'dashboardAppSlice',
  initialState: {
    user: {
      eligible: true,
      trial_end_date_time:
        'Jun 02 2023 16:22:57 GMT+0530 (India Standard Time)',
      trial_status: 'not_started'
    },
    banner: {
      showBanner: false,
      name: ''
    },
    modal: {
      show: false,
      name: ''
    },
    alert: {
      show: false,
      name: ''
    }
  },
  reducers: {
    setUser: (state, { payload }) => {
      const user = { ...state.user, ...payload };
      state.user = user;
    },
    setShowBanner: (state, { payload }) => {
      state.banner.showBanner = payload;
    },
    setBannerName: (state, { payload }) => {
      state.banner.name = payload;
    },
    setModalShow: (state, { payload }) => {
      state.modal.show = payload;
    },
    setModalName: (state, { payload }) => {
      state.modal.name = payload;
    },
    setAlertShow: (state, { payload }) => {
      state.alert.show = payload;
    },
    setAlertName: (state, { payload }) => {
      state.alert.name = payload;
    },
    setTrialState: (state, { payload }) => {
      state.user.trial_status = payload;
    }
  }
});

export const {
  setUser,
  setShowBanner,
  setModalShow,
  setModalName,
  setAlertName,
  setAlertShow,
  setBannerName,
  setTrialState
} = actions;

export default reducer;
