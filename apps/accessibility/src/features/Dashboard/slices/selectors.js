// ui selector
export const getActiveNav = (state) =>
  state.accessibility.ui.dashboard.activeNav;
export const getSidebarCollapsedStatus = (state) =>
  state.accessibility.ui.dashboard.sidebarCollapsed;
export const getUser = (state) => state.accessibility.app.dashboard.user;
export const getShowBanner = (state) =>
  state.accessibility.app.dashboard.banner.showBanner;
export const getBannerName = (state) =>
  state.accessibility.app.dashboard.banner.name;
export const getTrialState = (state) =>
  state.accessibility.app.dashboard.user.trial_status;
export const getModalName = (state) =>
  state.accessibility.app.dashboard.modal.name;
export const getModalShow = (state) =>
  state.accessibility.app.dashboard.modal.show;
export const getAlertName = (state) =>
  state.accessibility.app.dashboard.alert.name;
export const getAlertShow = (state) =>
  state.accessibility.app.dashboard.alert.show;
export const getTrialEndDate = (state) =>
  state.accessibility.app.dashboard.user.trial_end_date;
export const getTrialEligibility = (state) =>
  state.accessibility.app.dashboard.user.rft_eligible;

export const getIsFreeUser = (state) =>
  !state.accessibility.app.dashboard.user?.plan_type ||
  state.accessibility.app.dashboard.user?.plan_type === 'free';
