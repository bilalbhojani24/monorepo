import { useSelector } from 'react-redux';
import { getSessionDetails } from 'features/Home';

import { getLatestSessionStatus } from '../slices/reportLoadingSlice';

const useReportLoadingHeader = () => {
  const sessionState = useSelector(getLatestSessionStatus);
  const sessionDetails = useSelector(getSessionDetails);

  return { sessionState, sessionDetails };
};

export default useReportLoadingHeader;
