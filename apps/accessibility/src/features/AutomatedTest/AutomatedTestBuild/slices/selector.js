import { createSelector } from 'reselect';
import { formatComponentIdString } from 'utils/helper';

export const getBuildData = (state) =>
  state.accessibility.automatedTestBuild.data.buildData;
export const getBuildMetaData = (state) =>
  state.accessibility.automatedTestBuild.data.buildMetaData;
export const getActiveComponentId = (state) =>
  state.accessibility.automatedTestBuild.app.activeComponentId;
export const getBuildFilters = (state) =>
  state.accessibility.automatedTestBuild.app.activeFilters;
export const getIsShowingIssue = (state) =>
  state.accessibility.automatedTestBuild.app.isShowingIssue;
export const getCustomData = (state) =>
  state.accessibility.automatedTestBuild.data.customData;
export const getShowHiddenIssuesState = (state) =>
  state.accessibility.automatedTestBuild.app.showHiddenIssues.hideIssues;
export const getIsFilterModalVisible = (state) =>
  state.accessibility.automatedTestBuild.app.isFilterModalVisible;
export const getFilters = (state) =>
  state.accessibility.automatedTestBuild.data.filters;
export const getActiveSwitch = (state) =>
  state.accessibility.automatedTestBuild.app.activeSwitch;
export const getActiveTab = (state) =>
  state.accessibility.automatedTestBuild.app.activeTab;

export const getUniqFilterValues = createSelector(getFilters, (filters) => {
  const { pages, componentIds, category: categoryList } = filters;
  const urls = pages.map((page) => ({
    label: page.url,
    value: page.url
  }));
  const ids = componentIds.map((componentId) => ({
    label: formatComponentIdString(componentId),
    value: componentId
  }));
  const categories = categoryList.map((category) => ({
    label: category.split('cat.')[1],
    value: category.split('cat.')[1]
  }));
  return { urls, componentIds: ids, categories };
});

export const getActiveViolationId = (state) =>
  state.accessibility.automatedTestBuild.app.activeViolationId;
export const getActiveIssueIndex = (state) =>
  state.accessibility.automatedTestBuild.app.activeIssueIndex;

export const getActiveViolation = createSelector(
  getActiveViolationId,
  getBuildData,
  (activeViolationId, buildData) => {
    if (activeViolationId) {
      return buildData.find(({ id }) => id === activeViolationId);
    }
    return null;
  }
);

export const getActiveComponentNodes = createSelector(
  getActiveViolation,
  getActiveComponentId,
  getShowHiddenIssuesState,
  getBuildFilters,
  (activeViolation, activeComponentId, showHiddenIssues, activeFilters) => {
    if (activeViolation) {
      let activeViolationCopy = activeViolation;
      if (showHiddenIssues) {
        const filteredNodes = [];

        activeViolation.nodes.forEach((node) => {
          node.childNodes.forEach((item) => {
            if (item.hidden) {
              filteredNodes.push(node);
            }
          });
        });
        activeViolationCopy = {
          ...activeViolationCopy,
          nodes: filteredNodes
        };
      } else {
        const filteredNodes = [];

        activeViolation.nodes.forEach((node) => {
          node.childNodes.forEach((item) => {
            if (activeFilters.showNeedsReviewIssues) {
              if (item.confirmed === null) {
                filteredNodes.push(node);
              }
            } else if (item.confirmed || item.confirmed === null) {
              filteredNodes.push(node);
            }
          });
        });
        activeViolationCopy = {
          ...activeViolationCopy,
          nodes: filteredNodes
        };
      }
      return activeViolationCopy.nodes.filter(
        ({ componentId }) => componentId === activeComponentId
      );
    }
    return [];
  }
);

export const getIssueItem = createSelector(
  getActiveComponentNodes,
  getActiveIssueIndex,
  (activeComponentNodes, activeIssueIndex) => {
    if (
      activeComponentNodes &&
      activeIssueIndex > activeComponentNodes.length - 1 &&
      activeIssueIndex < 0
    ) {
      return 0;
    }
    return activeComponentNodes[activeIssueIndex];
  }
);
