import { useSelector } from 'react-redux';

import { getCurrentSetupStep } from '../slices/newPerformanceSessionSlice';

const useNewPerformanceSessionModal = () => {
  const currentSetupStep = useSelector(getCurrentSetupStep);

  return { currentSetupStep };
};

export default useNewPerformanceSessionModal;
