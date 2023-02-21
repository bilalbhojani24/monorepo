import { useSelector } from 'react-redux';

import { getSessionMetrics } from '../../Report';

const useScreenLoadTime = () => {
  const sessionData = useSelector(getSessionMetrics);

  return { sessionData };
};

export default useScreenLoadTime;
