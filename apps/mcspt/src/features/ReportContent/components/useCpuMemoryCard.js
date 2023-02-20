import { useSelector } from 'react-redux';

import { getSessionMetrics } from '../../Report';

const useCpuMemoryCard = () => {
  const sessionData = useSelector(getSessionMetrics);

  return { sessionData };
};

export default useCpuMemoryCard;
