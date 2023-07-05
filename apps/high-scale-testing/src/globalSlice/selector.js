const getFetchedGridData = (state) => state.global.fetchedGridData;
const getUserHasSessions = (state) => state.global.hasSessions;
const getInstanceTypes = (state) => state.global.instanceTypes;
const getLastKnownSetupType = (state) => state.global.lastKnownSetupType;
const getShowSetup = (state) => state.global.showSetup;
const getTrialGrid = (state) => state.global.trialGrid;
const getIsApploading = (state) => state.global.isLoading;
const getRegions = (state) => state.global.regions;
const getUserDetails = (state) => state.global.userDetails;

export {
  getFetchedGridData,
  getInstanceTypes,
  getIsApploading,
  getLastKnownSetupType,
  getRegions,
  getShowSetup,
  getTrialGrid,
  getUserDetails,
  getUserHasSessions
};
