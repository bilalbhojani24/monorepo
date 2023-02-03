import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { getStorage, logEvent, setStorage } from '@browserstack/utils';
import fetchReports from 'api/fetchReports';
// import { events } from 'constants';
import debounce from 'lodash/debounce';
import { updateUrlWithQueryParam } from 'utils/helper';

// import { getStorage, setStorage } from 'utils/localStorage';
import {
  resetReportSelection,
  setActiveVersion,
  setReportList
} from './slices/reportsAppSlice';
import { getActiveVersion, getReportList } from './slices/selector';

export default function useReports() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const reportList = useSelector(getReportList);
  const activeVersion = useSelector(getActiveVersion);
  const selectedReportsLength = reportList.filter(
    (report) => report.isSelected
  ).length;
  const isMergeDisabled = selectedReportsLength < 2;
  // const isShowingModalByDefault = getStorage('showed-extension-modal');
  // const isShowingBannerByDefault = getStorage('showed-extension-banner');
  // const isLandingFirstTime = getStorage('is-landing-first-time');
  // const [isOpen, setIsOpen] = useState(!isShowingModalByDefault);
  const [searchInput, setSearchInput] = useState('');
  // const [isShowingBanner, setIsShowingBanner] = useState(
  //   !isShowingBannerByDefault
  // );
  const [isLoading, setIsLoading] = useState(false);

  // const handleClose = ({ action }) => {
  //   setIsOpen(false);
  //   setStorage('showed-extension-modal', true);

  //   if (action === 'cross-click') {
  //     logEvent('InteractedWithADExtensionDownloadModal', {
  //       actionType: events.CROSS_BUTTON
  //     });
  //   } else if (action === 'do-later') {
  //     logEvent('InteractedWithADExtensionDownloadModal', {
  //       actionType: events.CLOSE_MODAL
  //     });
  //   } else if (action === 'download-extension') {
  //     logEvent('InteractedWithADExtensionDownloadModal', {
  //       actionType: events.DOWNLOAD_EXTENSION
  //     });
  //   }
  // };

  // // Note: Mount effect
  // useEffect(() => {
  //   if (isLandingFirstTime) {
  //     setStorage('is-landing-first-time', true);
  //     logEvent('OnADHomepage', {
  //       firstVisit: true
  //     });
  //   } else {
  //     logEvent('OnADHomepage', {
  //       firstVisit: false
  //     });
  //   }
  //   if (!isShowingModalByDefault) {
  //     logEvent('OnADExtensionDownloadModal', {});
  //   }
  // }, [isLandingFirstTime, isShowingModalByDefault]);

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
    // setIsShowingBanner(false);
    // logEvent('InteractedWithADHomepage', {
    //   actionType: events.CLOSE_BANNER
    // });
  };

  const onDownloadExtensionClick = () => {
    // setIsShowingBanner(false);
    // setStorage('showed-extension-banner', true);
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
    history.push(`reports/report?${path}`);
  };

  const onInputValueChange = debounce((value) => {
    setSearchInput(value);
  }, 250);

  return {
    // isOpen,
    isLoading,
    // isShowingBanner,
    activeVersion,
    isMergeDisabled,
    reportList,
    selectedReportsLength,
    searchInput,
    resetSelection,
    onCloseClick,
    onDownloadExtensionClick,
    onInputValueChange,
    onReportConsolidateButtonClick,
    onVersionSelect
    // handleClose
  };
}
