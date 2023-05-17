import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IMPORT_STATUS } from '../const/immutables';
import { setDetailsModal, setReportModal } from '../slices/importProgressSlice';

const useImportProgress = () => {
  const dispatch = useDispatch();
  const [isCancelConfirmView, setCancelConfirmView] = useState(false);

  const importStatus = useSelector(
    (state) => state.importProgress.importStatus
  );
  const importDetails = useSelector(
    (state) => state.importProgress.importDetails
  );
  const isDetailsModalVisible = useSelector(
    (state) => state.importProgress.isDetailsModalVisible
  );
  const isReportModalVisible = useSelector(
    (state) => state.importProgress.isReportModalVisible
  );
  const isProgressDismissed = useSelector(
    (state) => state.importProgress.isProgressDismissed
  );
  const isCancelModalVisible = useSelector(
    (state) => state.importProgress.isCancelModalVisible
  );

  const showDetailsModal = () => {
    dispatch(setDetailsModal(true));
  };

  const showReportModal = () => {
    dispatch(setReportModal(true));
  };

  return {
    importStatus,
    isVisible: !(
      importStatus === IMPORT_STATUS.COMPLETED && isProgressDismissed
    ),
    importDetails,
    isDetailsModalVisible,
    isReportModalVisible,
    isCancelModalVisible,
    isCancelConfirmView,
    setCancelConfirmView,
    showDetailsModal,
    showReportModal
  };
};

export default useImportProgress;
