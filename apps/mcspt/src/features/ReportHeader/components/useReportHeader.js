import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getSessionMetrics } from 'features/Report';

const useReportHeader = () => {
  const sessionData = useSelector(getSessionMetrics);

  const navigateToPath = useNavigate();

  const backButtonClicked = () => {
    navigateToPath('/');
  };

  const openDiagnosticFolder = () => {
    window.remoteThreadFunctions.openSystemFileFromPath(
      sessionData?.metadata?.video
    );
  };

  return { sessionData, backButtonClicked, openDiagnosticFolder };
};

export default useReportHeader;
