const getFetchedGridData = (state) => state.global.fetchedGridData;
const getInstanceTypes = (state) => state.global.instanceTypes;
const getIsApploading = (state) => state.global.isLoading;
const getRegions = (state) => state.global.regions;
const getUserDetails = (state) => state.global.userDetails;

export {
  getFetchedGridData,
  getInstanceTypes,
  getIsApploading,
  getRegions,
  getUserDetails
};
