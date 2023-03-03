import { createSelector } from 'reselect';
import { formatComponentIdString } from 'utils/helper';

// app selector
export const getShowHiddenIssuesState = (state) =>
  state.accessibility.app.siteScannerReportApp.showHiddenIssues.hideIssues;
export const getActiveViolationId = (state) =>
  state.accessibility.app.siteScannerReportApp.activeViolationId;
export const getActiveComponentId = (state) =>
  state.accessibility.app.siteScannerReportApp.activeComponentId;
export const getActiveIssueIndex = (state) =>
  state.accessibility.app.siteScannerReportApp.activeIssueIndex;
export const getIsShowingIssue = (state) =>
  state.accessibility.app.siteScannerReportApp.isShowingIssue;
export const getIsActiveOpen = (state) =>
  state.accessibility.app.siteScannerReportApp.isActiveOpen;
export const getActiveTab = (state) =>
  state.accessibility.app.siteScannerReportApp.activeTab;
export const getActiveSwitch = (state) =>
  state.accessibility.app.siteScannerReportApp.activeSwitch;
export const getDefaultIndex = (state) =>
  state.accessibility.app.siteScannerReportApp.defaultIndex;
export const getOpenAccordionId = (state) =>
  state.accessibility.app.siteScannerReportApp.openAccordionId;
export const getReportFilters = (state) =>
  state.accessibility.app.siteScannerReportApp.activeFilters;
export const getIntermediateFilters = (state) =>
  state.accessibility.app.siteScannerReportApp.intermediateFilters;

// data selector
export const getReportData = (state) => {
  console.log(state.accessibility);
  return state.accessibility.data.siteScanner.scanReportsOverview;
};

export const getReportMetaData = (state) =>
  state.accessibility.data.siteScanner.reportOverviewMetaData;
export const getCustomData = (state) =>
  state.accessibility.data.siteScanner.customData;

export const getUniqFilterValues = createSelector(
  getReportData,
  (reportData) => {
    const urls = [];
    const componentIds = [];
    const categories = [];
    reportData?.forEach((violation) => {
      const category = violation.tags
        .find((tag) => tag.includes('cat.'))
        ?.split('cat.')[1];
      const categoryList = categories.map(({ label }) => label);
      if (!categoryList.includes(category)) {
        categories.push({
          label: category,
          value: category
        });
      }
      violation.nodes.forEach((node) => {
        const urlList = urls.map(({ value }) => value);
        const componentIdList = componentIds.map(({ value }) => value);
        if (!urlList.includes(node.page.url)) {
          urls.push({
            label: node.page.url,
            value: node.page.url
          });
        }
        if (!componentIdList.includes(node.componentId)) {
          componentIds.push({
            label: formatComponentIdString(node.componentId),
            value: node.componentId
          });
        }
      });
    });
    return { urls, componentIds, categories };
  }
);

// app + data selector
export const getActiveViolation = createSelector(
  getActiveViolationId,
  getReportData,
  (activeViolationId, reportData) => {
    if (activeViolationId) {
      return reportData.find(({ id }) => id === activeViolationId);
    }
    return null;
  }
);

export const getActiveComponentNodes = createSelector(
  getActiveViolation,
  getActiveComponentId,
  getShowHiddenIssuesState,
  getReportFilters,
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
