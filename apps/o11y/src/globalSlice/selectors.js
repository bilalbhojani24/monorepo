export const getProjects = (state) => state.global.projects;
export const getActiveProject = (state) => state.global.projects.active;
export const getInitData = (state) => state.global.initData;
export const getUserDetails = (state) =>
  state.global.initData?.data?.userDetails || {};
export const getBuildInfo = (state) => state.global.buildInfo;
export const getFeatureFlag = (state, feature) =>
  state.global.initData?.data?.userDetails?.planDetails?.features[feature] || {
    isMetered: false,
    isActive: false
  };
