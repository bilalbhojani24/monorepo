import { useSelector } from 'react-redux';

import { getSessionMetrics } from '../slices/reportSlice';

const useReport = () => {
  const sessionData = useSelector(getSessionMetrics);

  return { sessionData };
};

export default useReport;
