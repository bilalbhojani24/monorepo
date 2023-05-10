import { useCallback } from 'react';

const useReportRemoteFunctions = () => {
  const openUrlInSystemBrowser = useCallback((param) => {
    window.remoteThreadFunctions?.openUrlInSystemBrowser(param);
  }, []);

  const openSystemFileFromPath = useCallback((param) => {
    window.remoteThreadFunctions.openSystemFileFromPath(param);
  }, []);

  return { openUrlInSystemBrowser, openSystemFileFromPath };
};

export default useReportRemoteFunctions;
