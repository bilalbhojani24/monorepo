import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getPreviousRouteForReport,
  getSessionMetrics
} from '@browserstack/mcp-shared/features/Report';
import { ReportContext } from '@browserstack/mcp-shared/features/Report/ReportContext';
import { formatDeviceAndAppAnalyticsData } from '@browserstack/mcp-shared/utils/analyticsDataUtils';
import { mcpAnalyticsEvent } from '@browserstack/mcp-shared/utils/analyticsUtils';

const useReportHeader = () => {
  const sessionData = useSelector(getSessionMetrics);
  const previousRouteForReport = useSelector(getPreviousRouteForReport);

  const { handleFolderViaConsumer } = useContext(ReportContext);

  const navigateToPath = useNavigate();

  const backButtonClicked = () => {
    navigateToPath(previousRouteForReport);
  };

  const openDiagnosticFolder = () => {
    mcpAnalyticsEvent(
      'csptReportDiagnosticLogsBtnClick',
      formatDeviceAndAppAnalyticsData(sessionData?.device, sessionData?.package)
    );

    handleFolderViaConsumer(sessionData?.metadata?.video);
  };

  return { sessionData, backButtonClicked, openDiagnosticFolder };
};

export default useReportHeader;
