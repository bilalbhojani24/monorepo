import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'dashboardAppSlice',
  initialState: {
    user: null,
    banner: {
      showBanner: true,
      trialState: 'started'
    },
    modal: {
      show: false,
      name: ''
    },
    alert: {
      show: true,
      name: 'buyPlan'
    },
    trial: {
      eligible: true,
      endDate: 'June 10 2023 14:30:36 GMT+0530'
    }
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setShowBanner: (state, { payload }) => {
      state.banner.showBanner = payload;
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
  setAlertShow
} = actions;

export default reducer;
