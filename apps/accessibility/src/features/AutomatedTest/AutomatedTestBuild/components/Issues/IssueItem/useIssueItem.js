import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ISSUE_DETAILS_TAB } from 'constants';
import SectionsDataContext from 'features/AutomatedTest/AutomatedTestBuild/context/SectionsDataContext';
import {
  setActiveIssueIndex,
  setIsShowingIssue
} from 'features/Report/slice/appSlice';
import {
  getActiveComponentId,
  getActiveComponentNodes,
  getActiveIssueIndex,
  getActiveSwitch,
  getActiveViolation,
  getActiveViolationId,
  getCustomData,
  getIssueItem,
  getReportFilters,
  getReportMetaData,
  getShowHiddenIssuesState
} from 'features/Report/slice/selector';
import { updateUrlWithQueryParam } from 'utils/helper';

export default function useIssueItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sectionData, onNextClick, onPreviousClick, onIssueCloseClick } =
    useContext(SectionsDataContext);
  const [activeTab, setActiveTab] = useState(ISSUE_DETAILS_TAB);
  const [isCopied, setIsCopied] = useState(false);

  const reportMetaData = useSelector(getReportMetaData);
  const issueNode = useSelector(getIssueItem);
  const activeSwitch = useSelector(getActiveSwitch);
  const activeNodes = useSelector(getActiveComponentNodes);
  const activeViolationId = useSelector(getActiveViolationId);
  const activeIssueSection = useSelector(getActiveViolation);
  const activeComponentId = useSelector(getActiveComponentId);
  const activeReportFilters = useSelector(getReportFilters);
  const showHiddenIssues = useSelector(getShowHiddenIssuesState);

  const customData = useSelector(getCustomData);
  const activeIssueIndex = useSelector(getActiveIssueIndex);
  const activeFilters = useSelector(getReportFilters);
  const params = new URLSearchParams(window.location.search);
  const wcagVersion = params.get('wcagVersion');
  const reportIds = params.get('ids');

  const onTabChange = (tab) => {
    setActiveTab(tab);
  };

  const onTagClick = (tagVersion) => {
    window.open(customData[tagVersion].urls[wcagVersion], '_blank');
  };

  const getNodeNeedsReviewStatusInReports = (
    childNodes,
    reportMetaData,
    testType
  ) => {
    const result = [];
    if (childNodes.length > 0) {
      childNodes.forEach((item) => {
        if (showHiddenIssues) {
          if (item.hidden) {
            result.push({
              id: `${testType}:${item.reportId}`,
              reportName:
                reportMetaData.meta[`${testType}:${item.reportId}`].name,
              confirmed: false
            });
          }
        } else if (activeFilters.showNeedsReviewIssues) {
          if (item.confirmed === null) {
            result.push({
              id: `${testType}:${item.reportId}`,
              reportName:
                reportMetaData.meta[`${testType}:${item.reportId}`].name,
              confirmed: item.confirmed
            });
          }
        } else {
          result.push({
            id: `${testType}:${item.reportId}`,
            reportName:
              reportMetaData.meta[`${testType}:${item.reportId}`].name,
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

  let activeIssueItem = null;
  let activeViolationItem = null;
  let activeSectionNodes = null;

  const sanitizeValue = (val) => {
    if (typeof val !== 'string' && Array.isArray(val)) {
      return val.join(',');
    }
    return val;
  };

  const isGuidelineMode = activeSwitch === GUIDELINES;
  if (isGuidelineMode) {
    activeViolationItem = sectionData.find(
      ({ violation }) => violation.id === activeViolationId
    ).violation;
    if (showHiddenIssues) {
      activeViolationItem = {
        ...activeViolationItem,
        nodes: activeViolationItem.nodes.filter(({ hidden }) => hidden)
      };
    } else {
      activeViolationItem = {
        ...activeViolationItem,
        nodes: activeViolationItem.nodes.filter(({ confirmed }) =>
          activeReportFilters.showNeedsReviewIssues
            ? confirmed === null
            : confirmed || confirmed === null
        )
      };
    }
    activeIssueItem = activeViolationItem.nodes.filter(
      ({ componentId }) => componentId === activeComponentId
    )[activeIssueIndex];
    activeSectionNodes = activeViolationItem.nodes.filter(
      (node) => node.componentId === activeComponentId
    );
  }

  const issueItem = isGuidelineMode ? activeIssueItem : issueNode;
  const activeViolation = isGuidelineMode
    ? activeViolationItem
    : activeIssueSection;
  let activeComponentNodes = isGuidelineMode ? activeSectionNodes : activeNodes;

  // NOTE: Node filter logic for the right panel
  if (activeReportFilters.page.length) {
    activeComponentNodes = activeComponentNodes.filter((node) =>
      activeReportFilters.page.map(({ value }) => value).includes(node.page.url)
    );
  }
  if (activeReportFilters.component.length) {
    activeComponentNodes = activeComponentNodes.filter((node) =>
      activeReportFilters.component
        .map(({ value }) => value)
        .includes(node.componentId)
    );
  }

  const headerData = {
    tags: isGuidelineMode
      ? activeViolation.tags.filter((tag) => tag === activeViolation.id)
      : activeViolation.tags,
    help: activeViolation.help,
    description: activeViolation.description
  };

  const maxLimit = activeComponentNodes.length - 1;

  return {
    activeTab,
    isCopied,
    activeIssueIndex,
    customData,
    wcagVersion,
    reportIds,
    headerData,
    issueItem,
    onNextClick,
    onPreviousClick,
    onCloseClick,
    onTabChange,
    onTagClick,
    setIsCopied,
    getNodeNeedsReviewStatusInReports,
    getReviewMessage
  };
}
