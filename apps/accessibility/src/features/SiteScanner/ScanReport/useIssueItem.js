import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ISSUE_DETAILS_TAB } from 'constants';
import { updateUrlWithQueryParam } from 'utils/helper';

import { setShowFreshChatButton } from '../../Dashboard/slices/uiSlice';
import { getActiveVersion } from '../../Reports/slices/selector';

import { setActiveIssueIndex, setIsShowingIssue } from './slice/appSlice';
import {
  getActiveIssueIndex,
  getCustomData,
  getReportFilters,
  getShowHiddenIssuesState
} from './slice/selector';

export default function useIssueItem(activeComponentNodes) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(ISSUE_DETAILS_TAB);
  const [isCopied, setIsCopied] = useState(false);
  const customData = useSelector(getCustomData);
  const activeIssueIndex = useSelector(getActiveIssueIndex);
  const showHiddenIssues = useSelector(getShowHiddenIssuesState);
  const activeFilters = useSelector(getReportFilters);
  const params = new URLSearchParams(window.location.search);
  const activeVersion = useSelector(getActiveVersion);
  const reportIds = params.get('ids');
  const wcagVersion = activeVersion.split('WCAG ')[1];

  const maxLimit = activeComponentNodes?.length - 1;
  const onNextClick = () => {
    // console.log({ activeComponentNodes, activeIssueIndex });
    if (activeIssueIndex < maxLimit) {
      const newIndex = activeIssueIndex + 1;
      dispatch(setActiveIssueIndex(newIndex));
      const path = updateUrlWithQueryParam({ activeIssueIndex: newIndex });
      navigate(`?${path}`);
    }
  };

  const onPreviousClick = () => {
    if (activeIssueIndex > 0) {
      const newIndex = activeIssueIndex - 1;
      dispatch(setActiveIssueIndex(newIndex));
      const path = updateUrlWithQueryParam({ activeIssueIndex: newIndex });
      navigate(`?${path}`);
    }
  };

  const onFirstPageClick = () => {
    dispatch(setActiveIssueIndex(0));
    const path = updateUrlWithQueryParam({ activeIssueIndex: 0 });
    navigate(`?${path}`);
  };

  const onLastPageClick = () => {
    const newIndex = activeComponentNodes.length - 1;
    dispatch(setActiveIssueIndex(newIndex));
    const path = updateUrlWithQueryParam({ activeIssueIndex: newIndex });
    navigate(`?${path}`);
  };

  const onCloseClick = () => {
    dispatch(setIsShowingIssue(false));
    dispatch(setShowFreshChatButton(true));
    const path = updateUrlWithQueryParam({
      activeIssueIndex: 0,
      isShowingIssue: false
    });
    navigate(`?${path}`);
    console.log('herrer');
  };

  const onTabChange = (tab) => {
    setActiveTab(tab);
  };

  const onTagClick = (tagVersion) => {
    window.open(customData[tagVersion].urls[wcagVersion], '_blank');
  };

  const getNodeNeedsReviewStatusInReports = (childNodes, reportMetaData) => {
    const result = [];
    if (childNodes.length > 0) {
      childNodes.forEach((item) => {
        if (showHiddenIssues) {
          if (item.hidden) {
            result.push({
              reportName:
                reportMetaData.meta[`websiteScan:${item.reportId}`].name,
              confirmed: false
            });
          }
        } else if (activeFilters.showNeedsReviewIssues) {
          if (item.confirmed === null) {
            result.push({
              reportName:
                reportMetaData.meta[`websiteScan:${item.reportId}`].name,
              confirmed: item.confirmed
            });
          }
        } else {
          result.push({
            reportName:
              reportMetaData.meta[`websiteScan:${item.reportId}`].name,
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

  return {
    activeTab,
    isCopied,
    activeIssueIndex,
    customData,
    wcagVersion,
    reportIds,
    onNextClick,
    onPreviousClick,
    onFirstPageClick,
    onLastPageClick,
    onCloseClick,
    onTabChange,
    onTagClick,
    setIsCopied,
    getNodeNeedsReviewStatusInReports,
    getReviewMessage
  };
}
