import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dismissProgressBar } from 'api/import.api';

import { IMPORT_STATUS } from '../const/immutables';
import {
  setDetailsModal,
  setIsProgressDismissed,
  setReportModal
} from '../slices/importProgressSlice';

const useImportProgress = () => {
  const dispatch = useDispatch();
  const [isCancelConfirmView, setCancelConfirmView] = useState(false);

  const importId = useSelector((state) => state.import.importId);
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
  const showAlertLoader = useSelector(
    (state) => state.importProgress.loader.alert
  );

  const showDetailsModal = () => {
    dispatch(setDetailsModal(true));
  };

  const showReportModal = () => {
    dispatch(setReportModal(true));
  };

  const closeProgress = () => {
    dispatch(setIsProgressDismissed(true));
    dismissProgressBar(importId);
  };

  return {
    importStatus,
    isVisible:
      importStatus === IMPORT_STATUS.ONGOING ||
      ((importStatus === IMPORT_STATUS.FAILURE ||
        importStatus === IMPORT_STATUS.SUCCESS) &&
        !isProgressDismissed),
    importDetails,
    isDetailsModalVisible,
    isReportModalVisible,
    isCancelModalVisible,
    isCancelConfirmView,
    showAlertLoader,
    closeProgress,
    setCancelConfirmView,
    showDetailsModal,
    showReportModal
  };
};

export default useImportProgress;
