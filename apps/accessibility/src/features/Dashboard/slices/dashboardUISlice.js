import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'dashboard',
  initialState: {
    activeNav: 'reports',
    sidebarCollapsed: false
  },
  reducers: {
    setActiveNav: (state, { payload }) => {
      state.activeNav = payload;
    },
    setSidebarCollapsed: (state, { payload }) => {
      console.log('Hbye');
      state.sidebarCollapsed = payload;
    }
  }
});

export const { setActiveNav, setSidebarCollapsed } = actions;

export default reducer;
