import { useSelector } from 'react-redux';
import { getSessionMetrics } from 'features/Report';
import { formatDeviceAndAppAnalyticsData } from 'utils/analyticsDataUtils';
import { mcpAnalyticsEvent } from 'utils/analyticsUtils';

const generateSessionNameString = (session) =>
  `${session?.package?.name} v${session?.package?.version} • ${session?.device?.name}`;

const useReportContent = () => {
  const sessionData = useSelector(getSessionMetrics);

  const openDiagnosticFolder = () => {
    mcpAnalyticsEvent(
      'csptReportDiagnosticLogsBtnClick',
      formatDeviceAndAppAnalyticsData(sessionData?.device, sessionData?.package)
    );

    window.remoteThreadFunctions.openSystemFileFromPath(
      sessionData?.metadata?.video
    );
  };

  return { sessionData, openDiagnosticFolder, generateSessionNameString };
};

export default useReportContent;
