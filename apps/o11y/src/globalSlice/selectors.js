export const getHeaderSize = (state) => state.global.headerSize;
export const getProjects = (state) => state.global.projects;
export const getActiveProject = (state) => state.global.projects.active;
export const getInitData = (state) => state.global.initData;
export const getUserDetails = (state) =>
  state.global.initData?.data?.userDetails || {};
export const getUserId = (state) =>
  state.global.initData?.data?.userDetails?.userId || 0;
export const getBuildInfo = (state) => state.global.buildInfo;
export const getHasInitFailed = (state) => state.global.hasProductInitFailed;
export const getActiveFloatingComponents = (state) =>
  state.global.activeFloatingComponents;
