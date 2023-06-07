import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import AppRoute from 'const/routes';
import { retryQuickImport } from 'features/quickImportFlow/slices/quickImportThunk';
import { logEventHelper } from 'utils/logEvent';

import { setReportModal } from '../slices/importProgressSlice';

const useReportModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

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
    if (location.pathname === AppRoute.ROOT && searchParams.get('import_id'))
      navigate(AppRoute.ROOT, { replace: true });
  };
  const retryImport = () => {
    const fromEmail =
      location.pathname === AppRoute.ROOT && searchParams.get('import_id');
    dispatch(retryQuickImport(false, navigate, fromEmail));
    dispatch(setReportModal(false));
    dispatch(logEventHelper('TM_QiReportRetryCtaClicked', {}));
  };

  const handleDocumentationClick = () => {
    dispatch(logEventHelper('TM_QiReportDocPageLinkClicked', {}));
    window.open(
      'https://www.browserstack.com/docs/test-management/quick-start/quick-import'
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
