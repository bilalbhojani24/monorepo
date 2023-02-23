import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { startImportingTestCases } from '../slices/importCSVSlice';

const usePreviewAndConfirm = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const previewData = useSelector((state) => state.importCSV.previewData);
  const folderName = useSelector((state) => state.importCSV.folderName);
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

  const previewAndConfirmTableRows = previewData.map((data, idx) => ({
    id: idx + 1,
    title: data.name,
    templateType: data.template,
    owner: data.owner,
    priority: data.priority
  }));

  const handleImportTestCaseClick = () => {
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
    folderName,
    previewData,
    previewAndConfirmTableRows,
    showFolderExplorerModal,
    confirmCSVImportNotificationConfig,
    totalImportedProjectsInPreview,
    handleImportTestCaseClick
  };
};

export default usePreviewAndConfirm;
