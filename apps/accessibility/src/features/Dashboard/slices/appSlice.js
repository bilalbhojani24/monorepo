import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'dashboardAppSlice',
  initialState: {
    user: {},
    trialStatus: '',
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
  setBannerName
} = actions;

export default reducer;
