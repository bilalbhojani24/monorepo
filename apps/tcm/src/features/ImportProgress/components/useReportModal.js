import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { retryQuickImport } from 'features/quickImportFlow/slices/quickImportThunk';
import { logEventHelper } from 'utils/logEvent';

import { setReportModal } from '../slices/importProgressSlice';

const useReportModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isReportModalVisible = useSelector(
    (state) => state.importProgress.isReportModalVisible
  );
  const reportModalProjects = useSelector(
    (state) => state.importProgress.reportModalProjects
  );
  const importStatus = useSelector(
    (state) => state.importProgress.importStatus
  );
  const viewReportLoading = useSelector(
    (state) => state.importProgress.loader.report
  );

  const closeReportModal = () => {
    dispatch(setReportModal(false));
  };
  const retryImport = () => {
    dispatch(retryQuickImport(false, navigate));
    dispatch(setReportModal(false));
    dispatch(logEventHelper('TM_QiReportRetryCtaClicked', {}));
  };

  const handleDocumentationClick = () => {
    dispatch(logEventHelper('TM_QiReportDocPageLinkClicked', {}));
    window.open(
      'https://www.browserstack.com/docs/test-management/overview/what-is-test-management'
    );
  };

  useEffect(() => {
    if (isReportModalVisible) {
      dispatch(logEventHelper('TM_QiReportPopupLoaded', {}));
    }
  }, [dispatch, isReportModalVisible]);

  return {
    importStatus,
    closeReportModal,
    isReportModalVisible,
    retryImport,
    reportModalProjects,
    viewReportLoading,
    handleDocumentationClick
  };
};

export default useReportModal;
