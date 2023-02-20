import { useSelector } from 'react-redux';

import { getSessionMetrics } from '../../Report';

const useUIRenderingCard = () => {
  const sessionData = useSelector(getSessionMetrics);

  return { sessionData };
};

export default useUIRenderingCard;
