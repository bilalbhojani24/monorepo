import { useSelector } from 'react-redux';

import { getSessionMetrics } from 'features/Report';

const useReportContent = () => {
  const sessionData = useSelector(getSessionMetrics);

  const openDiagnosticFolder = () => {
    window.remoteThreadFunctions.openSystemFileFromPath(
      sessionData?.metadata?.video
    );
  };

  return { sessionData, openDiagnosticFolder };
};

export default useReportContent;
