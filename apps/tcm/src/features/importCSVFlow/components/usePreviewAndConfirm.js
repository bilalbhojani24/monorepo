import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
import {
  clearNotificationConfig,
  startImportingTestCaseRejected,
  updateImportProgress
} from '../slices/importCSVSlice';

const usePreviewAndConfirm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { sendMessage, lastMessage } = useWebSocket(WS_URL);
  const { projectId } = useParams();
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
    getImportResultAPI(mapFieldsConfig.importId).then((res) => {
      if (!res.success) {
        return;
      }

      dispatch(
        addNotificaton({
          id: `import_success_ ${res.import_id}`,
          title: 'CSV data imported',
          description: `${res.total_count} test cases have been imported successfully`,
          variant: 'success'
        })
      );
      dispatch(resetImportCSVState());
      dispatch(clearNotificationConfig());
      navigate(
        routeFormatter(AppRoute.TEST_CASES, {
          projectId: res.project_id,
          folderId: res.folder_id
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
        project_id: projectId
      })
    );
    // make an api call
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

  const handleWSMessage = (thisMessage) => {
    if (thisMessage?.data) {
      const message = JSON.parse(thisMessage.data)?.message;

      if (message?.error) {
        // if upload ends in error
        dispatch(
          startImportingTestCaseRejected({
            response: { status: message?.status }
          })
        );
      } else {
        const percent = message?.percent;
        if (percent && percent > confirmCSVImportNotificationConfig?.progress) {
          // if percent exists and only if its greated than the existing progress (incase the WS packets are delayed)
          dispatch(updateImportProgress(percent));

          if (percent >= 100) {
            // once done, reroute
            reRouteOnSuccess();
          }
        }
      }
    }
  };

  useEffect(() => {
    handleWSMessage(lastMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
