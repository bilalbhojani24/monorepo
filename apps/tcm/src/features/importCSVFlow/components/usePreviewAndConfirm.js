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

  const previewAndConfirmTableRows = previewData.map((data, idx) => ({
    id: idx + 1,
    title: data.name,
    templateType: data.template,
    priority: data.priority
  }));

  const handleImportTestCaseClick = () => {
    // make an api call
    const projectId = queryParams.get('project');
    dispatch(
      startImportingTestCases({
        importId: mapFieldsConfig.importId,
        projectId,
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
    handleImportTestCaseClick
  };
};

export default usePreviewAndConfirm;
