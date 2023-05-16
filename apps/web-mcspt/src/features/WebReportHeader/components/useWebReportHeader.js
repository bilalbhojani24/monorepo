import { useSelector } from 'react-redux';
import { getSessionMetrics } from '@browserstack/mcp-shared';

const useReportHeader = () => {
  const sessionData = useSelector(getSessionMetrics);

  return { sessionData };
};

export default useReportHeader;
