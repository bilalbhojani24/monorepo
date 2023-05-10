import { useContext } from 'react';
import { useSelector } from 'react-redux';

import { formatDeviceAndAppAnalyticsData } from '../../../utils/analyticsDataUtils';
import { mcpAnalyticsEvent } from '../../../utils/analyticsUtils';
import { getSessionMetrics } from '../../Report';
import { ReportContext } from '../../Report/ReportContext';

const generateSessionNameString = (session) =>
  `${session?.package?.name} v${session?.package?.version} • ${session?.device?.name}`;

const useReportContent = () => {
  const sessionData = useSelector(getSessionMetrics);

  const { handleFolderViaConsumer } = useContext(ReportContext);

  const openDiagnosticFolder = () => {
    mcpAnalyticsEvent(
      'csptReportDiagnosticLogsBtnClick',
      formatDeviceAndAppAnalyticsData(sessionData?.device, sessionData?.package)
    );

    handleFolderViaConsumer(sessionData?.metadata?.video);
  };

  return { sessionData, openDiagnosticFolder, generateSessionNameString };
};

export default useReportContent;
