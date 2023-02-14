import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getStorage, setStorage } from '@browserstack/utils';
import fetchReports from 'api/fetchReports';
import { getSidebarCollapsedStatus } from 'features/Dashboard/slices/selectors';
// import { events } from 'constants';
import debounce from 'lodash/debounce';
import { updateUrlWithQueryParam } from 'utils/helper';

import {
  resetReportSelection,
  setActiveVersion,
  setLastIndex,
  setReportList,
  setSelectedReportType
} from './slices/reportsAppSlice';
import {
  getActiveVersion,
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
  const isShowingBannerByDefault = getStorage('showed-extension-banner');
  const isLandingFirstTime = getStorage('is-landing-first-time');
  const [isOpen, setIsOpen] = useState(!isShowingModalByDefault);
  const [searchInput, setSearchInput] = useState('');
  const [isShowingBanner, setIsShowingBanner] = useState(
    !isShowingBannerByDefault
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = ({ action }) => {
    setIsOpen(false);
    setStorage('showed-extension-modal', true);

    // if (action === 'cross-click') {
    //   logEvent('InteractedWithADExtensionDownloadModal', {
    //     actionType: events.CROSS_BUTTON
    //   });
    // } else if (action === 'do-later') {
    //   logEvent('InteractedWithADExtensionDownloadModal', {
    //     actionType: events.CLOSE_MODAL
    //   });
    // } else if (action === 'download-extension') {
    //   logEvent('InteractedWithADExtensionDownloadModal', {
    //     actionType: events.DOWNLOAD_EXTENSION
    //   });
    // }
  };

  // Note: Mount effect
  useEffect(() => {
    if (isLandingFirstTime) {
      setStorage('is-landing-first-time', true);
      // logEvent('OnADHomepage', {
      //   firstVisit: true
      // });
    } else {
      // logEvent('OnADHomepage', {
      //   firstVisit: false
      // });
    }
    // if (!isShowingModalByDefault) {
    //   logEvent('OnADExtensionDownloadModal', {});
    // }
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

  const onVersionSelect = (id) => {
    if (id !== activeVersion) {
      dispatch(setActiveVersion(id));
      // logEvent('InteractedWithADHomepage', {
      //   actionType: events.SELECT_TAB,
      //   tabName: id
      // });
    }
  };

  const resetSelection = () => {
    dispatch(resetReportSelection());
    // logEvent('InteractedWithADHomepage', {
    //   actionType: events.CANCEL_SELECTION
    // });
  };

  const onCloseClick = () => {
    setIsShowingBanner(false);
    // logEvent('InteractedWithADHomepage', {
    //   actionType: events.CLOSE_BANNER
    // });
  };

  const onDownloadExtensionClick = () => {
    setIsShowingBanner(false);
    setStorage('showed-extension-banner', true);
    window.open(window.accessibilityExtensionChromeStoreURL, '_target');
  };

  const onReportConsolidateButtonClick = () => {
    const selectedReports = reportList
      .filter((report) => report.isSelected)
      .map(({ id }) => id);
    const idList = selectedReports.join(',');
    const params = {
      ids: idList,
      wcagVersion: activeVersion.split('WCAG ')[1]
    };
    if (window.dashboardUserID) {
      params.dashboardUserID = window.dashboardUserID;
    }
    const path = updateUrlWithQueryParam(params);
    // logEvent('InteractedWithADHomepage', {
    //   actionType: 'View consolidated report',
    //   reportCount: selectedReportsLength
    // });
    navigate(`reports/report?${path}`);
  };

  const onInputValueChange = debounce((e) => {
    setSearchInput(e.target.value);
  }, 250);

  const updateLastIndex = (index) => {
    dispatch(setLastIndex(index));
  };

  const onUpdateSelectedReportType = (value) => {
    dispatch(setSelectedReportType(value));
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
    onCloseClick,
    onDownloadExtensionClick,
    onUpdateSelectedReportType,
    onInputValueChange,
    updateLastIndex,
    onReportConsolidateButtonClick,
    onVersionSelect,
    handleClose
  };
}
