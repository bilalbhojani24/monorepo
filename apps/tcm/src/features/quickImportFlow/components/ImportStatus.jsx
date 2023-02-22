import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Notifications, notify } from '@browserstack/bifrost';
import {
  AccessTimeFilledRoundedIcon,
  CheckCircleRoundedIcon,
  ErrorIcon
} from 'assets/icons';
import {
  TMBanner,
  TMButton,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader,
  TMTruncateText
} from 'common/bifrostProxy';

import useProjects from '../../Projects/components/useProjects';
import { COMPLETED, FAILURE, INFINITY, ONGOING } from '../const/importConst';
import {
  setCurrentScreen,
  setImportStarted,
  setNotificationDismissed,
  setRetryImport,
  setSelectedRadioIdMap,
  setShowNotificationModal
} from '../slices/importSlice';

import useImportStatus from './useImportStatus';

const ImportStatus = () => {
  const {
    importStatus,
    importId,
    notificationData,
    importProjects,
    totalImportProjectsCount,
    successImportProjectCount,
    testManagementTool,
    isNotificationDismissed,
    showNotificationModal,
    checkImportStatusClicked,
    checkImportStatusClickHandler
  } = useImportStatus();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fetchProjects } = useProjects();

  const dismissNotification = (toastData, modalDecider) => {
    notify.remove(toastData.id);
    if (importStatus === ONGOING) return;
    dispatch(setNotificationDismissed(importId));
    if (modalDecider !== 'showModal') {
      dispatch(setImportStarted(false));
    }
  };

  const retryImportFn = () => {
    dispatch(setCurrentScreen('configureTool'));

    // api call for retry
    const currentTestManagementTool =
      testManagementTool.split('_')[0] === 'testrail'
        ? `${testManagementTool.split('_')[0]}s`
        : testManagementTool.split('_')[0];

    dispatch(
      setSelectedRadioIdMap({
        key: currentTestManagementTool,
        value: 'import-from-tool'
      })
    );

    dispatch(
      setRetryImport({
        id: importId,
        testTool: testManagementTool.split('_')[0]
      })
    );
    dispatch(setShowNotificationModal(false));
    navigate('/import');
  };

  const handleNotificationClose = (toastData) => {
    dismissNotification(toastData);
  };

  const onModalCloseHandler = () => {
    dispatch(setShowNotificationModal(false));
    dispatch(setImportStarted(false));
  };

  const handleFirstButtonClick = (toastData) => () => {
    if (
      importStatus === COMPLETED &&
      totalImportProjectsCount > successImportProjectCount
    ) {
      dispatch(setShowNotificationModal(true));
      dismissNotification(toastData, 'showModal');
    } else {
      dismissNotification(toastData);
      fetchProjects();
      navigate('/');
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSecondButtonClick = (toastData) => () => {
    dismissNotification(toastData);
    if (
      importStatus === COMPLETED &&
      totalImportProjectsCount > successImportProjectCount
    )
      retryImportFn();
  };

  // only works on refresh and if banner does not comes.
  useEffect(() => {
    if (
      notificationData &&
      importStatus === COMPLETED &&
      !isNotificationDismissed &&
      !checkImportStatusClicked
    ) {
      notify(
        <Notifications
          id={notificationData?.id}
          title={
            totalImportProjectsCount > successImportProjectCount
              ? `${successImportProjectCount}/${totalImportProjectsCount} ${notificationData?.title}`
              : notificationData?.title
          }
          description={notificationData?.description}
          headerIcon={notificationData?.headerIcon}
          handleClose={handleNotificationClose}
          actionButtons={(toastData) => (
            <>
              <TMButton
                onClick={handleFirstButtonClick(toastData)}
                variant="minimal"
                colors="white"
              >
                {notificationData?.firstButton}
              </TMButton>
              <TMButton
                variant="minimal"
                wrapperClassName="text-base-600"
                onClick={handleSecondButtonClick(toastData)}
              >
                {notificationData?.secondButton}
              </TMButton>
            </>
          )}
        />,
        {
          position: 'top-right',
          duration: INFINITY
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationData, importStatus]);

  return (
    <>
      {importStatus === ONGOING && (
        <TMBanner
          align="extreme"
          description="We’ve started importing your projects which will take some time. We’ll also notify you over email once it’s completed."
          isDismissButton={false}
          placement="relative"
          modifier="brand"
          bannerIcon={
            <AccessTimeFilledRoundedIcon className="text-brand-500" />
          }
          ctaButton={
            <TMButton
              variant="minimal"
              wrapperClassName="text-brand-50 underline hover:text-brand-50"
              onClick={checkImportStatusClickHandler}
            >
              Check Import Status
            </TMButton>
          }
        />
      )}
      {showNotificationModal && (
        <TMModal
          show={showNotificationModal}
          withDismissButton
          onOverlayClick={onModalCloseHandler}
        >
          <TMModalHeader
            heading="View Report"
            handleDismissClick={onModalCloseHandler}
          />
          <TMModalBody>
            <div className="text-base-700 mt-4 mb-2 block text-sm font-medium">
              Below is a report of all the completed project imports:
            </div>
            <div className="border-base-100 text-base-500 mt-7 flex place-content-between border-b p-3 text-xs font-medium">
              <span className="inline-flex flex-1">Project</span>
              <span className="ml-6 inline-flex flex-1">Status</span>
            </div>
            {importProjects.length &&
              importProjects.map((project) => (
                <div className="border-base-100 text-base-500 flex place-content-between border-b p-3 text-xs">
                  <span className="text-base-900 inline-flex flex-1 text-sm font-medium">
                    <TMTruncateText hidetooltipTriggerIcon>
                      {project.name}
                    </TMTruncateText>
                  </span>
                  <div className="ml-6 flex-1">
                    {project.status === FAILURE ? (
                      <>
                        <ErrorIcon className="text-danger-600" />
                        <div className="text-base-500 text-sm">
                          <TMTruncateText
                            hidetooltipTriggerIcon
                            wrapperClassName="line-clamp-2"
                            isFullWidthTooltip
                          >
                            {project.error}
                          </TMTruncateText>
                        </div>
                      </>
                    ) : (
                      <CheckCircleRoundedIcon className="text-success-600" />
                    )}
                  </div>
                </div>
              ))}
          </TMModalBody>
          <TMModalFooter position="right">
            <TMButton
              variant="primary"
              colors="white"
              onClick={onModalCloseHandler}
            >
              Close
            </TMButton>
            <TMButton variant="primary" colors="brand" onClick={retryImportFn}>
              Retry Import
            </TMButton>
          </TMModalFooter>
        </TMModal>
      )}
    </>
  );
};

export default ImportStatus;
