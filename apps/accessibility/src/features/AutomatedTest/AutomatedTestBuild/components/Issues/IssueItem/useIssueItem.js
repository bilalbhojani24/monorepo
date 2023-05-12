import { useContext, useState } from 'react';
import { ISSUE_DETAILS_TAB } from 'constants';

export default function useIssueItem(sectionsDataContext) {
  const {
    buildMetaData,
    activeIssueIndex,
    headerData,
    activeViolation,
    activeViolationId,
    isGuidelineMode,
    activeBuildFilters,
    customData,
    activeComponentNodes,
    activeComponentId,
    showHiddenIssues,
    wcagVersion,
    issueItem,
    onNextClick,
    onPreviousClick,
    onIssueCloseClick
  } = useContext(sectionsDataContext);
  const [activeTab, setActiveTab] = useState(ISSUE_DETAILS_TAB);
  const [isCopied, setIsCopied] = useState(false);

  const onTabChange = (tab) => {
    setActiveTab(tab);
  };

  const onTagClick = (tagVersion) => {
    window.open(customData[tagVersion].urls[wcagVersion], '_blank');
  };

  const getNodeNeedsReviewStatusInReports = (childNodes, testType) => {
    const result = [];
    if (childNodes.length > 0) {
      childNodes.forEach((item) => {
        if (showHiddenIssues) {
          if (item.hidden) {
            result.push({
              id: `${testType}:${item.reportId}`,
              reportName:
                buildMetaData?.meta[`${testType}:${item.reportId}`]?.name,
              confirmed: false
            });
          }
        } else if (activeBuildFilters.showNeedsReviewIssues) {
          if (item.confirmed === null) {
            result.push({
              id: `${testType}:${item.reportId}`,
              reportName:
                buildMetaData?.meta[`${testType}:${item.reportId}`]?.name,
              confirmed: item.confirmed
            });
          }
        } else {
          result.push({
            id: `${testType}:${item.reportId}`,
            reportName:
              buildMetaData?.meta[`${testType}:${item.reportId}`]?.name,
            confirmed: item.confirmed
          });
        }
      });
    }
    return result;
  };

  const getReviewMessage = (data) => {
    for (let i = 0; i < data.length; i += 1) {
      for (let j = 0; j < data[i].nodeList?.length; j += 1) {
        if (data[i].nodeList[j].message) {
          return data[i].nodeList[j].message;
        }
      }
    }

    return '';
  };

  const sanitizeValue = (val) => {
    if (typeof val !== 'string' && Array.isArray(val)) {
      return val.join(',');
    }
    return val;
  };

  return {
    activeTab,
    isCopied,
    activeIssueIndex,
    activeViolation,
    showHiddenIssues,
    activeComponentNodes,
    activeViolationId,
    isGuidelineMode,
    headerData,
    issueItem,
    buildMetaData,
    activeComponentId,
    sanitizeValue,
    onNextClick,
    onPreviousClick,
    onIssueCloseClick,
    onTabChange,
    onTagClick,
    setIsCopied,
    getNodeNeedsReviewStatusInReports,
    getReviewMessage
  };
}
