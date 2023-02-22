import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Notifications, notify } from '@browserstack/bifrost';
import { TMButton } from 'common/bifrostProxy';

import { getQuickImportStatus } from '../../../api/import.api';
import {
  COMPLETED,
  FAILURE_DATA,
  INFINITY,
  ONGOING,
  SUCCESS_DATA,
  WARNING_DATA
} from '../const/importConst';
import {
  setCheckImportStatusClicked,
  setCurrentScreen,
  setCurrentTestManagementTool,
  setImportStarted,
  setImportStatus,
  setNotificationData,
  setNotificationDismissed,
  setNotificationProjectConfig,
  setRetryImport,
  setSelectedRadioIdMap,
  setShowNotificationModal
} from '../slices/importSlice';

const useImportStatus = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const importStatus = useSelector((state) => state.import.importStatus);
  const importId = useSelector((state) => state.import.importId);
  const isNotificationDismissed = useSelector(
    (state) => state.import.isDismissed
  );
  const notificationData = useSelector(
    (state) => state.import.notificationData
  );
  const {
    projects: importProjects,
    totalCount: totalImportProjectsCount,
    successCount: successImportProjectCount
  } = useSelector((state) => state.import.notificationProjectConfig);

  const testManagementTool = useSelector(
    (state) => state.import.currentTestManagementTool
  );
  const showNotificationModal = useSelector(
    (state) => state.import.showNotificationModal
  );
  const checkImportStatusClicked = useSelector(
    (state) => state.import.checkImportStatusClicked
  );

  const dismissNotification = (
    toastData,
    currentImportStatus,
    modalDecider
  ) => {
    notify.remove(toastData.id);
    if (currentImportStatus === ONGOING) return;
    dispatch(setNotificationDismissed(importId));
    if (modalDecider !== 'showModal') {
      dispatch(setImportStarted(false));
    }
  };

  const retryImportFn = (testTool) => {
    dispatch(setCurrentScreen('configureTool'));

    // api call for retry
    const currentTestManagementTool =
      testTool.split('_')[0] === 'testrail'
        ? `${testTool.split('_')[0]}s`
        : testTool.split('_')[0];

    dispatch(
      setSelectedRadioIdMap({
        key: currentTestManagementTool,
        value: 'import-from-tool'
      })
    );
    dispatch(
      setRetryImport({ id: importId, testTool: testTool.split('_')[0] })
    );
    dispatch(setShowNotificationModal(false));
    navigate('/import');
  };

  const handleNotificationClose = (currentImportStatus) => (toastData) => {
    dismissNotification(toastData, currentImportStatus);
    // if (importStatus === ONGOING) dispatch(setCheckImportStatusClicked(false));
  };

  const handleFirstButtonClick =
    (toastData, currentImportStatus, totalCount, successCount) => () => {
      if (currentImportStatus === COMPLETED && totalCount > successCount) {
        dispatch(setShowNotificationModal(true));
        dismissNotification(toastData, currentImportStatus, 'showModal');
      } else {
        dismissNotification(toastData, currentImportStatus);
        navigate('/');
      }
    };

  const handleSecondButtonClick =
    (toastData, currentImportStatus, totalCount, successCount, importType) =>
    () => {
      dismissNotification(toastData, currentImportStatus);
      if (currentImportStatus === COMPLETED && totalCount > successCount)
        retryImportFn(importType);
    };

  const showNotification = (
    data,
    currentImportStatus,
    totalCount,
    successCount,
    importType
  ) => {
    notify(
      <Notifications
        id={data?.id}
        // isCondensed
        title={
          totalCount > successCount
            ? `${successCount}/${totalCount} ${data?.title}`
            : data?.title
        }
        description={data?.description}
        headerIcon={data?.headerIcon}
        handleClose={handleNotificationClose(currentImportStatus)}
        actionButtons={(toastData) => (
          <>
            <TMButton
              onClick={handleFirstButtonClick(
                toastData,
                currentImportStatus,
                totalCount,
                successCount
              )}
              variant="minimal"
              colors="white"
            >
              {data?.firstButton}
            </TMButton>
            <TMButton
              variant="minimal"
              wrapperClassName="text-base-600"
              onClick={handleSecondButtonClick(
                toastData,
                currentImportStatus,
                totalCount,
                successCount,
                importType
              )}
            >
              {data?.secondButton}
            </TMButton>
          </>
        )}
      />,
      {
        position: 'top-right',
        duration: INFINITY
      }
    );
  };

  const checkImportStatusClickHandler = () => {
    dispatch(setCheckImportStatusClicked(true));
    getQuickImportStatus(importId).then((data) => {
      dispatch(setImportStatus(data.status));
      if (data.status === ONGOING) {
        dispatch(setNotificationData(WARNING_DATA));
        showNotification(WARNING_DATA, data.status);
      } else if (data.status === COMPLETED) {
        if (data.success_count < data.total) {
          dispatch(setNotificationData(FAILURE_DATA));
          dispatch(
            setNotificationProjectConfig({
              projects: data.projects,
              totalCount: data.total,
              successCount: data.success_count
            })
          );
          dispatch(
            setCurrentTestManagementTool(
              data.import_type.split('_')[0] === 'testrail'
                ? 'testrails'
                : 'zephyr'
            )
          );
          showNotification(
            FAILURE_DATA,
            data.status,
            data.total,
            data.success_count,
            data.import_type
          );
        } else {
          dispatch(setNotificationData(SUCCESS_DATA));
          showNotification(SUCCESS_DATA, data.status);
        }
      }
    });
  };

  return {
    importStatus,
    isNotificationDismissed,
    importId,
    notificationData,
    importProjects,
    totalImportProjectsCount,
    successImportProjectCount,
    testManagementTool,
    showNotificationModal,
    checkImportStatusClicked,
    checkImportStatusClickHandler
  };
};

export default useImportStatus;
