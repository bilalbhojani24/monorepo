import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { retryQuickImport } from '../../quickImportFlow/slices/quickImportThunk';
import { setReportModal } from '../slices/importProgressSlice';
import { setQuickImportResult } from '../slices/importProgressThunk';

const useReportModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isReportModalVisible = useSelector(
    (state) => state.importProgress.isReportModalVisible
  );
  const reportModalProjects = useSelector(
    (state) => state.importProgress.reportModalProjects
  );

  const closeReportModal = () => {
    dispatch(setReportModal(false));
  };
  const retryImport = () => {
    dispatch(retryQuickImport(false, navigate));
    dispatch(setReportModal(false));
    // if (quickImportProjectId)
    //   navigate(`/projects/${quickImportProjectId}/quick-import`);
    // else navigate(AppRoute.IMPORT);
  };

  useEffect(() => {
    dispatch(setQuickImportResult());
  }, [dispatch]);

  return {
    closeReportModal,
    isReportModalVisible,
    retryImport,
    reportModalProjects
  };
};

export default useReportModal;
