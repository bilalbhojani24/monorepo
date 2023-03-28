import { useSelector } from 'react-redux';
import { getSessionMetrics } from 'features/Report';

const generateSessionNameString = (session) =>
  `${session?.package?.name} v${session?.package?.version} • ${session?.device?.name}`;

const useReportContent = () => {
  const sessionData = useSelector(getSessionMetrics);

  const openDiagnosticFolder = () => {
    window.remoteThreadFunctions.openSystemFileFromPath(
      sessionData?.metadata?.video
    );
  };

  return { sessionData, openDiagnosticFolder, generateSessionNameString };
};

export default useReportContent;
