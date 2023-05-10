import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { formatDeviceAndAppAnalyticsData } from '../../../utils/analyticsDataUtils';
import { mcpAnalyticsEvent } from '../../../utils/analyticsUtils';
import { getPreviousRouteForReport, getSessionMetrics } from '../../Report';
import { ReportContext } from '../../Report/ReportContext';

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
