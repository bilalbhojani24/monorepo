const getClustersData = (state) => state.gridConsole.clustersData;
const getGridsData = (state) => state.gridConsole.gridsData;
const getSelectedClusterData = (state) => state.gridConsole.selectedCluserData;
const getSelectedGridData = (state) => state.gridConsole.selectedGridData;
const getShowCreateGridButton = (state) =>
  state.gridConsole.showCreateGridButton;

export {
  getClustersData,
  getGridsData,
  getSelectedClusterData,
  getSelectedGridData,
  getShowCreateGridButton
};
