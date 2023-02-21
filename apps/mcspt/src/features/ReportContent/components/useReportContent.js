import { useSelector } from 'react-redux';

import { getSessionMetrics } from '../../Report';

const useReportContent = () => {
  const sessionData = useSelector(getSessionMetrics);

  const openDiagnosticFolder = () => {
    window.remoteThreadFunctions.openSystemFileFromPath(
      sessionData?.metadata?.diagnostic
    );
  };

  return { sessionData, openDiagnosticFolder };
};

export default useReportContent;
