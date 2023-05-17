import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// import AppRoute from 'const/routes';
import { retryQuickImport } from '../../quickImportFlow/slices/quickImportThunk';
import { setReportModal } from '../slices/importProgressSlice';

const useReportModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const quickImportProjectId = useSelector(
  //   (state) => state.import.quickImportProjectId
  // );
  const isReportModalVisible = useSelector(
    (state) => state.importProgress.isReportModalVisible
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

  return { closeReportModal, isReportModalVisible, retryImport };
};

export default useReportModal;
