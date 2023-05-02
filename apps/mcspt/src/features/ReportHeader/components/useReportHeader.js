import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPreviousRouteForReport, getSessionMetrics } from 'features/Report';
import { formatDeviceAndAppAnalyticsData } from 'utils/analyticsDataUtils';
import { mcpAnalyticsEvent } from 'utils/analyticsUtils';

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

    window.remoteThreadFunctions.openSystemFileFromPath(
      sessionData?.metadata?.video
    );
  };

  return { sessionData, backButtonClicked, openDiagnosticFolder };
};

export default useReportHeader;
