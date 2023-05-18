import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  DOC_LINKS_CONSTANTS,
  getSessionMetrics
} from '@browserstack/mcp-shared';

const useReportHeader = () => {
  const sessionData = useSelector(getSessionMetrics);

  const [showDesktopAppDownloadBanner, setShowDesktopAppDownloadBanner] =
    useState(true);

  const dismissDesktopAppDownloadBanner = useCallback(() => {
    setShowDesktopAppDownloadBanner(false);
  }, []);

  const redirectToDesktopApp = useCallback(() => {
    window.open(DOC_LINKS_CONSTANTS.MCP_LANDING, '_blank');
  }, []);

  return {
    sessionData,
    showDesktopAppDownloadBanner,
    dismissDesktopAppDownloadBanner,
    redirectToDesktopApp
  };
};

export default useReportHeader;
