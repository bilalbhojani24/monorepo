import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { REPORT_LOADING_STATES } from '../const/reportLoadingConstants';

const useReportLoading = () => {
  const [sessionState, setSessionState] = useState(
    REPORT_LOADING_STATES.CONNECTING
  );

  const navigateToPath = useNavigate();

  const onCancelClicked = () => {
    navigateToPath('/');
  };

  useEffect(() => {
    setTimeout(() => {
      setSessionState(REPORT_LOADING_STATES.LAUNCHING);
    }, 3000);

    setTimeout(() => {
      setSessionState(REPORT_LOADING_STATES.RECORDING);
    }, 6000);
  }, []);

  return { sessionState, onCancelClicked };
};

export default useReportLoading;
