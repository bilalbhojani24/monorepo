import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPreviousRouteForReport, getSessionMetrics } from 'features/Report';

const useReportHeader = () => {
  const sessionData = useSelector(getSessionMetrics);
  const previousRouteForReport = useSelector(getPreviousRouteForReport);

  const navigateToPath = useNavigate();

  const backButtonClicked = () => {
    navigateToPath(previousRouteForReport);
  };

  const openDiagnosticFolder = () => {
    window.remoteThreadFunctions.openSystemFileFromPath(
      sessionData?.metadata?.video
    );
  };

  return { sessionData, backButtonClicked, openDiagnosticFolder };
};

export default useReportHeader;
