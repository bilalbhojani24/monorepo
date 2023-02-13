import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useReportLoading = () => {
  const [sessionState, setSessionState] = useState('CONNECTING');

  const navigateToPath = useNavigate();

  const onCancelClicked = () => {
    navigateToPath('/');
  };

  useEffect(() => {
    setTimeout(() => {
      setSessionState('LAUNCHING');
    }, 3000);

    setTimeout(() => {
      setSessionState('RECORDING');
    }, 6000);
  }, []);

  return { sessionState, onCancelClicked };
};

export default useReportLoading;
