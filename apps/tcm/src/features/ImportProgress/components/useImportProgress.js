import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
// import { WS_URL } from 'const/routes';
import { IMPORT_STATUS } from '../const/immutables';
import {
  setDetailsModal,
  // setImportDetails,
  // setIsProgressVisible,
  setReportModal
} from '../slices/importProgressSlice';

const useImportProgress = () => {
  const dispatch = useDispatch();
  // const { sendMessage, _ } = useWebSocket(WS_URL);

  const [isCancelConfirmView, setCancelConfirmView] = useState(false);
  // const importId = useSelector((state) => state.import.importId);
  const importStatus = useSelector(
    (state) => state.importProgress.importStatus
  );
  const importDetails = useSelector(
    (state) => state.importProgress.importDetails
  );
  const isDetailsModalVisible = useSelector(
    (state) => state.importProgress.isDetailsModalVisible
  );
  const isReportModalVisible = useSelector(
    (state) => state.importProgress.isReportModalVisible
  );
  const isProgressDismissed = useSelector(
    (state) => state.importProgress.isProgressDismissed
  );

  const showDetailsModal = () => {
    dispatch(setDetailsModal(true));
  };

  const showReportModal = () => {
    dispatch(setReportModal(true));
  };

  // const closeProgress = () => {
  //   dispatch(setIsProgressVisible(false));
  // };

  const closeDetailsModal = () => {
    setCancelConfirmView(false);
    dispatch(setDetailsModal(false));
  };

  const closeReportModal = () => {
    dispatch(setReportModal(false));
  };

  const cancelImportHandler = () => {};

  // const connectWSSForQuickImport = useCallback(() => {
  //   const identifier = {
  //     channel: 'ImportChannel',
  //     import_id: importId
  //   };
  //   sendMessage(
  //     JSON.stringify({
  //       command: 'subscribe',
  //       identifier: JSON.stringify(identifier)
  //     })
  //   );
  // }, [importId, sendMessage]);

  // useEffect(() => {
  //   connectWSSForQuickImport();
  // }, [connectWSSForQuickImport]);

  return {
    importStatus,
    isVisible: !(
      importStatus === IMPORT_STATUS.COMPLETED && isProgressDismissed
    ),
    importDetails,
    isDetailsModalVisible,
    isReportModalVisible,
    isCancelConfirmView,
    setCancelConfirmView,
    showDetailsModal,
    closeDetailsModal,
    cancelImportHandler,
    showReportModal,
    // closeProgress,
    closeReportModal
  };
};

export default useImportProgress;
