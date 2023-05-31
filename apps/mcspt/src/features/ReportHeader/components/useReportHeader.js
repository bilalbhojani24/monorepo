import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  formatDeviceAndAppAnalyticsData,
  getPreviousRouteForReport,
  getSessionMetrics,
  mcpAnalyticsEvent
} from '@browserstack/mcp-shared';
import { openSystemFileFromPath } from 'utils/reportRemoteFunctions';

const useReportHeader = () => {
  const sessionData = useSelector(getSessionMetrics);
  const previousRouteForReport = useSelector(getPreviousRouteForReport);

  const navigateToPath = useNavigate();

  const backButtonClicked = () => {
    navigateToPath(previousRouteForReport);
  };

  const openDiagnosticFolder = () => {
    mcpAnalyticsEvent(
      'csptReportDiagnosticLogsBtnClick',
      formatDeviceAndAppAnalyticsData(sessionData?.device, sessionData?.package)
    );

    openSystemFileFromPath(sessionData?.metadata?.video);
  };

  return { sessionData, backButtonClicked, openDiagnosticFolder };
};

export default useReportHeader;
