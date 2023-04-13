import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { WS_URL } from 'const/routes';
import { logEventHelper } from 'utils/logEvent';

import { startImportingTestCases } from '../slices/csvThunk';
import { updateImportProgress } from '../slices/importCSVSlice';

const usePreviewAndConfirm = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { sendMessage, lastMessage, readyState } = useWebSocket(WS_URL);
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

  const connectWSS = () => {
    const identifier = {
      channel: 'ImportChannel',
      import_id: mapFieldsConfig.importId
    };
    debugger;
    sendMessage(
      JSON.stringify({
        command: 'subscribe',
        identifier: JSON.stringify(identifier)
      })
    );
  };

  const handleImportTestCaseClick = () => {
    dispatch(
      logEventHelper('TM_ImportCsvStep3ProceedBtnClicked', {
        project_id: queryParams.get('project')
      })
    );
    // make an api call
    const projectId = queryParams.get('project');
    const folderId = queryParams.get('folder');

    connectWSS();
    dispatch(
      startImportingTestCases({
        importId: mapFieldsConfig.importId,
        projectId,
        folderId,
        retryImport
      })
    );
  };

  useEffect(() => {
    // console.log(lastMessage);

    dispatch(updateImportProgress(10));
  }, [lastMessage]);

  return {
    previewData,
    showFolderExplorerModal,
    confirmCSVImportNotificationConfig,
    totalImportedProjectsInPreview,
    handleImportTestCaseClick
  };
};

export default usePreviewAndConfirm;
