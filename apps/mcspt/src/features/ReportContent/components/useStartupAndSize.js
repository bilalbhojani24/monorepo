import { useSelector } from 'react-redux';
import { getSessionMetrics } from 'features/Report';

const useStartupAndSize = () => {
  const sessionData = useSelector(getSessionMetrics);

  return { sessionData };
};

export default useStartupAndSize;
