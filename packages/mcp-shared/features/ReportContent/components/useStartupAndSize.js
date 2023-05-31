import { useSelector } from 'react-redux';

import { getSessionMetrics } from '../../Report';

const useStartupAndSize = () => {
  const sessionData = useSelector(getSessionMetrics);

  return { sessionData };
};

export default useStartupAndSize;
