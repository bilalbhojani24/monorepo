// ui selector
export const getActiveNav = (state) =>
  state.accessibility.ui.dashboard.activeNav;
export const getSidebarCollapsedStatus = (state) =>
  state.accessibility.ui.dashboard.sidebarCollapsed;
export const getShowFreshChatButton = (state) =>
  state.accessibility.ui.dashboard.showFreshChatButton;
export const getUser = (state) => state.accessibility.app.dashboard.user;

export const getIsFreeUser = (state) =>
  !state.accessibility.app.dashboard.user?.plan_type ||
  state.accessibility.app.dashboard.user?.plan_type === 'free';
