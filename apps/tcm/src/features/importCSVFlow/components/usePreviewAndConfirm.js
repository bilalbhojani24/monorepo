import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import { getImportResultAPI } from 'api/importCSV.api';
import AppRoute, { WS_URL } from 'const/routes';
import { addNotificaton } from 'globalSlice';
import { routeFormatter } from 'utils/helperFunctions';
import { logEventHelper } from 'utils/logEvent';

import {
  resetImportCSVState,
  startImportingTestCases
} from '../slices/csvThunk';
import { updateImportProgress } from '../slices/importCSVSlice';

const usePreviewAndConfirm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { sendMessage, lastMessage } = useWebSocket(WS_URL);
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

  const reRouteOnSuccess = () => {
    getImportResultAPI(mapFieldsConfig.importId).then(() => {
      dispatch(
        addNotificaton({
          id: `import_success_ ${mapFieldsConfig.importId}`,
          title: 'Import success',
          description: `ABCD EFG`,
          variant: 'success'
        })
      );
      dispatch(resetImportCSVState());
      navigate(
        routeFormatter(AppRoute.TEST_CASES, {
          projectId: 1,
          folderId: 2
        })
      );
    });
  };

  const connectWSS = () => {
    const identifier = {
      channel: 'ImportChannel',
      import_id: mapFieldsConfig.importId
    };
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
    if (lastMessage?.data) {
      const percent = JSON.parse(lastMessage.data)?.message?.percent;
      if (percent && percent > confirmCSVImportNotificationConfig?.progress) {
        // if percent exists and only if its greated than the existing progress (incase the WS packets are delayed)
        dispatch(updateImportProgress(percent));

        if (percent >= 100) {
          // once done, reroute
          reRouteOnSuccess();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, lastMessage]);

  return {
    previewData,
    showFolderExplorerModal,
    confirmCSVImportNotificationConfig,
    totalImportedProjectsInPreview,
    handleImportTestCaseClick
  };
};

export default usePreviewAndConfirm;
