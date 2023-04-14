import { quickImportCleanUp, setShowArtificialLoader } from './importSlice';

export const resetQuickImport = () => (dispatch, getState) => {
  // reset everything except related to notification and modal
  const {
    importId,
    importStatus,
    isDismissed,
    importStarted,
    notificationData,
    notificationProjectConfig,
    showNotificationModal,
    checkImportStatusClicked,
    quickImportProjectId,
    currentTestManagementTool
  } = getState().import;

  dispatch(
    quickImportCleanUp({
      importId,
      importStatus,
      isDismissed,
      importStarted,
      notificationData,
      notificationProjectConfig,
      showNotificationModal,
      checkImportStatusClicked,
      quickImportProjectId,
      currentTestManagementTool
    })
  );
};

export const handleArtificialLoader = (delay) => (dispatch) => {
  dispatch(setShowArtificialLoader(true));
  setTimeout(() => {
    dispatch(setShowArtificialLoader(false));
  }, delay);
};
