import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'dashboard',
  initialState: {
    activeNav: 'reports',
    sidebarCollapsed: false,
    showFreshChatButton: true
  },
  reducers: {
    setActiveNav: (state, { payload }) => {
      state.activeNav = payload;
    },
    setSidebarCollapsed: (state, { payload }) => {
      state.sidebarCollapsed = payload;
    },
    setShowFreshChatButton: (state, { payload }) => {
      state.showFreshChatButton = payload;
    }
  }
});

export const { setActiveNav, setSidebarCollapsed, setShowFreshChatButton } =
  actions;

export default reducer;
