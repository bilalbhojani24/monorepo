import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import { getImportResultAPI } from 'api/importCSV.api';
import { getProjectsMinifiedAPI } from 'api/projects.api';
import AppRoute, { WS_URL } from 'const/routes';
import { addNotificaton, setAllProjects } from 'globalSlice';
import { routeFormatter } from 'utils/helperFunctions';
import { logEventHelper } from 'utils/logEvent';

import {
  resetImportCSVState,
  startImportingTestCases
} from '../slices/csvThunk';
import {
  clearNotificationConfig,
  setNotificationConfigForConfirmCSVImport,
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
  const hasProjects = useSelector((state) => state.onboarding.hasProjects);

  const refreshMinifiedProjects = () => {
    if (!hasProjects) {
      getProjectsMinifiedAPI().then((response) => {
        dispatch(setAllProjects(response?.projects || []));
      });
    }
  };

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
      refreshMinifiedProjects();
      dispatch(resetImportCSVState());
      dispatch(clearNotificationConfig());
      const projectAndFolderIdObj = {};
      if (res?.folder_id) projectAndFolderIdObj.folderId = res?.folder_id;
      projectAndFolderIdObj.projectId = res?.project_id;
      const route = routeFormatter(AppRoute.TEST_CASES, projectAndFolderIdObj);
      navigate(route);
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
      logEventHelper('TM_CiConfirmImportCtaClicked', {
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

  const resetNotification = () => {
    dispatch(
      setNotificationConfigForConfirmCSVImport({
        show: false,
        status: '',
        modalData: null
      })
    );
  };

  const handleWSErrorMessage = (message) => {
    if (confirmCSVImportNotificationConfig?.modalData?.isButtonLoading) {
      // import was cancelled by the user
      resetNotification();
      dispatch(
        addNotificaton({
          id: `import_cancelled_`,
          title: 'CSV import cancelled successfully',
          description: null,
          variant: 'success'
        })
      );
    } else {
      dispatch(
        startImportingTestCaseRejected({
          response: { status: message?.status }
        })
      );
    }
  };

  const handleWSProgressUpdate = (message) => {
    if (confirmCSVImportNotificationConfig?.modalData?.isButtonLoading)
      // if user already cancelled, then dont incerement even if any packets are receieved
      return;

    const percent = message?.percent;
    if (percent && percent > confirmCSVImportNotificationConfig?.progress) {
      // if percent exists and only if its greated than the existing progress (incase the WS packets are delayed)
      dispatch(updateImportProgress(percent));

      if (percent >= 100) {
        // once done, reroute
        reRouteOnSuccess();
      }
    }
  };

  const interpretWSMessage = (thisMessage) => {
    if (thisMessage?.data) {
      const message = JSON.parse(thisMessage.data)?.message;

      if (message?.error) {
        // if upload ends in error
        handleWSErrorMessage(message);
      } else {
        handleWSProgressUpdate(message);
      }
    }
  };

  useEffect(() => {
    interpretWSMessage(lastMessage);
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
