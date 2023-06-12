import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getStorage, setStorage } from '@browserstack/utils';
import fetchReports from 'api/fetchReports';
import { events, reportPerPage, testTypes } from 'constants';
import { getSidebarCollapsedStatus } from 'features/Dashboard/slices/selectors';
import debounce from 'lodash/debounce';
import { updateUrlWithQueryParam } from 'utils/helper';
import { logEvent } from 'utils/logEvent';

import { setShowFreshChatButton } from '../Dashboard/slices/uiSlice';

import {
  resetReportSelection,
  setActiveVersion,
  setLastIndex,
  setReportList,
  setSelectedReportType
} from './slices/appSlice';
import {
  getActiveVersion,
  getIsShowingBanner,
  getLastIndex,
  getReportList,
  getSelectedReportType
} from './slices/selector';

export default function useReports() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reportList = useSelector(getReportList);
  const activeVersion = useSelector(getActiveVersion);
  const lastIndex = useSelector(getLastIndex);
  const selectedReportType = useSelector(getSelectedReportType);
  const isSidebarCollapsed = useSelector(getSidebarCollapsedStatus);
  const selectedReportsLength = reportList.filter(
    (report) => report.isSelected
  ).length;
  const isMergeDisabled = selectedReportsLength < 2;
  const isShowingModalByDefault = getStorage('showed-extension-modal');
  const isLandingFirstTime = getStorage('is-landing-first-time');
  const [isOpen, setIsOpen] = useState(!isShowingModalByDefault);
  const [searchInput, setSearchInput] = useState('');
  const isShowingBanner = useSelector(getIsShowingBanner);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    const { scrollTop, clientHeight } = scrollRef.current;
    if (scrollTop + clientHeight >= 1204) {
      dispatch(setShowFreshChatButton(false));
    } else {
      dispatch(setShowFreshChatButton(true));
    }
  };

  const handleClose = ({ action }) => {
    setIsOpen(false);
    setStorage('showed-extension-modal', true);

    if (action === 'cross-click') {
      logEvent('InteractedWithADExtensionDownloadModal', {
        actionType: events.CROSS_BUTTON
      });
    } else if (action === 'do-later') {
      logEvent('InteractedWithADExtensionDownloadModal', {
        actionType: events.CLOSE_MODAL
      });
    } else if (action === 'download-extension') {
      logEvent('InteractedWithADExtensionDownloadModal', {
        actionType: events.DOWNLOAD_EXTENSION
      });
    }
  };

  // Note: Mount effect
  useEffect(() => {
    if (isLandingFirstTime) {
      setStorage('is-landing-first-time', true);
      logEvent('OnADHomepage', {
        firstVisit: true
      });
    } else {
      logEvent('OnADHomepage', {
        firstVisit: false
      });
    }
    if (!isShowingModalByDefault) {
      logEvent('OnADExtensionDownloadModal', {});
    }
  }, [isLandingFirstTime, isShowingModalByDefault]);

  useEffect(() => {
    setIsLoading(true);
    fetchReports(window.dashboardUserID).then((response) => {
      setIsLoading(false);
      dispatch(
        setReportList(
          response.map((report) => ({
            ...report,
            isSelected: false
          }))
        )
      );
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch(setShowFreshChatButton(true));
  }, []);

  const onVersionSelect = (id) => {
    if (id !== activeVersion) {
      dispatch(setActiveVersion(id));
      logEvent('InteractedWithADHomepage', {
        actionType: events.SELECT_TAB,
        tabName: id
      });
    }
  };

  const resetSelection = () => {
    dispatch(resetReportSelection());
    logEvent('InteractedWithADHomepage', {
      actionType: events.CANCEL_SELECTION
    });
  };

  const onReportConsolidateButtonClick = () => {
    const selectedReports = reportList
      .filter((report) => report.isSelected)
      .map(({ uniqueId }) => uniqueId);
    const workflowScanList = selectedReports
      .filter((id) => id.includes(testTypes.workflowScan))
      .map((id) => id.split(`${testTypes.workflowScan}:`)[1]);
    const assistiveTestList = selectedReports
      .filter((id) => id.includes(testTypes.assistiveTest))
      .map((id) => id.split(`${testTypes.assistiveTest}:`)[1]);
    const websiteScanList = selectedReports
      .filter((id) => id.includes(testTypes.websiteScan))
      .map((id) => id.split(`${testTypes.websiteScan}:`)[1]);

    const params = {
      wcagVersion: activeVersion.split('WCAG ')[1]
    };
    if (workflowScanList.length) {
      params.ids = workflowScanList.join(',');
    }
    if (assistiveTestList.length) {
      params.ar_ids = assistiveTestList.join(',');
    }
    if (websiteScanList.length) {
      params.wsr_ids = websiteScanList.join(',');
    }
    if (window.dashboardUserID) {
      params.dashboardUserID = window.dashboardUserID;
    }
    const path = updateUrlWithQueryParam(params);
    logEvent('InteractedWithADHomepage', {
      actionType: 'View consolidated report',
      reportCount: selectedReportsLength
    });
    navigate(`report?${path}`);
  };

  const updateLastIndex = (index) => {
    dispatch(setLastIndex(index));
  };

  const onInputValueChange = debounce((e) => {
    setSearchInput(e.target.value);
    updateLastIndex(reportPerPage);
  }, 250);

  const onUpdateSelectedReportType = (value) => {
    dispatch(setSelectedReportType(value));
    updateLastIndex(reportPerPage);
  };

  return {
    isOpen,
    isLoading,
    isShowingBanner,
    activeVersion,
    isSidebarCollapsed,
    lastIndex,
    isMergeDisabled,
    reportList,
    selectedReportsLength,
    searchInput,
    selectedReportType,
    resetSelection,
    onUpdateSelectedReportType,
    onInputValueChange,
    updateLastIndex,
    onReportConsolidateButtonClick,
    onVersionSelect,
    handleClose,
    scrollRef,
    handleScroll
  };
}
