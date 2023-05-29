// ui selector
export const getActiveNav = (state) =>
  state.accessibility.ui.dashboard.activeNav;
export const getSidebarCollapsedStatus = (state) =>
  state.accessibility.ui.dashboard.sidebarCollapsed;
export const getUser = (state) => state.accessibility.app.dashboard.user;
export const getShowBanner = (state) =>
  state.accessibility.app.dashboard.banner.showBanner;
export const getTrialState = (state) =>
  state.accessibility.app.dashboard.banner.trialState;
