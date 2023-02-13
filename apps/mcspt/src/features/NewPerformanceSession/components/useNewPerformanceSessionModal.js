import { useSelector } from 'react-redux';

import { getCurrentSetupStep } from '../slices/newPerformanceSessionSlice';

export default function useNewPerformanceSessionModal() {
  const currentSetupStep = useSelector(getCurrentSetupStep);

  return { currentSetupStep };
}
