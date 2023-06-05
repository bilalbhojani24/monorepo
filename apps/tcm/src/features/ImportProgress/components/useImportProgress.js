import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dismissProgressBarAPI } from 'api/import.api';
import { logEventHelper } from 'utils/logEvent';

import { IMPORT_STATUS } from '../const/immutables';
import {
  setDetailsModal,
  setIsProgressDismissed
} from '../slices/importProgressSlice';
import { setQuickImportResult } from '../slices/importProgressThunk';

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
  const currentTool = useSelector(
    (state) => state.import.currentTestManagementTool
  );
  const viewReportLoading = useSelector(
    (state) => state.importProgress.loader.report
  );

  const showDetailsModal = () => {
    dispatch(setDetailsModal(true));
    dispatch(logEventHelper('TM_QiAllProjectsViewDetailsLinkClicked', {}));
  };

  const isDetailBannerVisible =
    (importStatus === IMPORT_STATUS.ONGOING ||
      importStatus === IMPORT_STATUS.FAILURE ||
      importStatus === IMPORT_STATUS.SUCCESS) &&
    !isProgressDismissed;

  const showReportModal = (status) => {
    dispatch(setQuickImportResult());
    dispatch(
      logEventHelper('TM_QiViewReportLinkClicked', { import_status: status })
    );
  };

  const closeProgress = () => {
    dispatch(setIsProgressDismissed(true));
    dismissProgressBarAPI(importId);
  };

  return {
    importStatus,
    isVisible: isDetailBannerVisible,
    importDetails,
    isDetailsModalVisible,
    isReportModalVisible,
    isCancelModalVisible,
    isCancelConfirmView,
    showAlertLoader,
    currentTool,
    viewReportLoading,
    closeProgress,
    setCancelConfirmView,
    showDetailsModal,
    showReportModal
  };
};

export default useImportProgress;
