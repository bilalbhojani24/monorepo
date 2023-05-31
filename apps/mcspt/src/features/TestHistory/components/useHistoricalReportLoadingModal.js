import { useSelector } from 'react-redux';

import { getShowHistoricalReportLoadingModal } from '../slices/testHistorySlice';

const useHistoricalReportLoadingModal = () => {
  const showHistoricalReportLoadingModal = useSelector(
    getShowHistoricalReportLoadingModal
  );

  return {
    showHistoricalReportLoadingModal
  };
};

export default useHistoricalReportLoadingModal;
