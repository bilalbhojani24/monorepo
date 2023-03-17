import { useSelector } from 'react-redux';

import { getIsSessionStopInProgress } from '../slices/reportLoadingSlice';

const useGenerateReportPrompt = () => {
  const isSessionStopInProgress = useSelector(getIsSessionStopInProgress);

  return { isSessionStopInProgress };
};

export default useGenerateReportPrompt;
