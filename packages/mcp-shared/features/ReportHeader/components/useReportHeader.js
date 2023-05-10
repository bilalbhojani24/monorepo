import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { formatDeviceAndAppAnalyticsData } from '../../../utils/analyticsDataUtils';
import { mcpAnalyticsEvent } from '../../../utils/analyticsUtils';
import { getPreviousRouteForReport, getSessionMetrics } from '../../Report';

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
