import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { logEventHelper } from 'utils/logEvent';

import { startImportingTestCases } from '../slices/csvThunk';

const usePreviewAndConfirm = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const previewData = useSelector((state) => state.importCSV.previewData);
  const showFolderExplorerModal = useSelector(
    (state) => state.importCSV.showFolderExplorerModal
  );
  const confirmCSVImportNotificationConfig = useSelector(
    (state) => state.importCSV.confirmCSVImportNotificationConfig
  );
  const mapFieldsConfig = useSelector(
    (state) => state.importCSV.mapFieldsConfig
  );
  const retryImport = useSelector((state) => state.importCSV.retryCSVImport);
  const totalImportedProjectsInPreview = useSelector(
    (state) => state.importCSV.totalImportedProjectsInPreview
  );
  const selectedFolderLocation = useSelector(
    (state) => state.importCSV.selectedFolderLocation
  );

  const handleImportTestCaseClick = () => {
    dispatch(
      logEventHelper('TM_ImportCsvStep3ProceedBtnClicked', {
        project_id: queryParams.get('project')
      })
    );
    // make an api call
    const projectId = queryParams.get('project');
    const folderId = queryParams.get('folder');
    dispatch(
      startImportingTestCases({
        importId: mapFieldsConfig.importId,
        projectId,
        folderId,
        retryImport
      })
    );
  };

  return {
    previewData,
    selectedFolderLocation,
    showFolderExplorerModal,
    confirmCSVImportNotificationConfig,
    totalImportedProjectsInPreview,
    handleImportTestCaseClick
  };
};

export default usePreviewAndConfirm;
