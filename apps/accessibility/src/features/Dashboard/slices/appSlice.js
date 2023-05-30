import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'dashboardAppSlice',
  initialState: {
    user: null,
    banner: {
      showBanner: true,
      trialState: 'notStarted'
    },
    modal: {
      show: false,
      name: ''
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
    }
  }
});

export const { setUser, setShowBanner, setModalShow, setModalName } = actions;

export default reducer;
