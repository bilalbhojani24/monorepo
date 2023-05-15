import { createSelector } from 'reselect';
import { formatComponentIdString } from 'utils/helper';

export const getTestData = (state) =>
  state.accessibility.automatedTestBuild.test.data.testData;
export const getTestMetaData = (state) =>
  state.accessibility.automatedTestBuild.test.data.testMetaData;
export const getActiveComponentId = (state) =>
  state.accessibility.automatedTestBuild.test.app.activeComponentId;
export const getTestFilters = (state) =>
  state.accessibility.automatedTestBuild.test.app.activeFilters;
export const getIsShowingIssue = (state) =>
  state.accessibility.automatedTestBuild.test.app.isShowingIssue;
export const getCustomData = (state) =>
  state.accessibility.automatedTestBuild.test.data.customData;
export const getShowHiddenIssuesState = (state) =>
  state.accessibility.automatedTestBuild.test.app.showHiddenIssues.hideIssues;
export const getIsFilterModalVisible = (state) =>
  state.accessibility.automatedTestBuild.test.app.isFilterModalVisible;
export const getFilters = (state) =>
  state.accessibility.automatedTestBuild.test.data.filters;
export const getActiveSwitch = (state) =>
  state.accessibility.automatedTestBuild.test.app.activeSwitch;
export const getActiveTab = (state) =>
  state.accessibility.automatedTestBuild.test.app.activeTab;

export const getUniqFilterValues = createSelector(getFilters, (filters) => {
  const { pages, componentIds, categories: categoryList } = filters;
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
  state.accessibility.automatedTestBuild.test.app.activeViolationId;
export const getActiveIssueIndex = (state) =>
  state.accessibility.automatedTestBuild.test.app.activeIssueIndex;

export const getActiveViolation = createSelector(
  getActiveViolationId,
  getTestData,
  (activeViolationId, testData) => {
    if (activeViolationId) {
      return testData.find(({ id }) => id === activeViolationId);
    }
    return null;
  }
);

export const getActiveComponentNodes = createSelector(
  getActiveViolation,
  getActiveComponentId,
  getShowHiddenIssuesState,
  getTestFilters,
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
