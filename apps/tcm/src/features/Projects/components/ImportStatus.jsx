import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Notifications, notify } from '@browserstack/bifrost';
import {
  dismissNotificationForImport,
  getLatestQuickImportConfig,
  getQuickImportStatus,
  retryImport
} from 'api/import.api';
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
  TMModalHeader
} from 'common/bifrostProxy';

import {
  setCurrentImportStatus,
  setCurrentScreen,
  setCurrentTestManagementTool,
  setImportStarted,
  setSelectedRadioIdMap,
  setTestRailsCred
} from '../../quickImportFlow/slices/importSlice';
import {
  COMPLETED,
  FAILURE,
  FAILURE_DATA,
  INFINITY,
  ONGOING,
  SUCCESS_DATA,
  WARNING_DATA
} from '../const/importConst';

const ImportStatus = ({ importConfig }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const testManagementToolRef = useRef(null);
  const [latestImportConfig, setLatestImportConfig] = useState(importConfig);
  const [projectsForModal, setProjectsForModal] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const dismissNotification = (toastData, importType, modalDecider) => {
    notify.remove(toastData.id);
    if (importType === ONGOING) return;
    dismissNotificationForImport(latestImportConfig.importId);
    if (modalDecider !== 'showModal') dispatch(setImportStarted(false));
    setLatestImportConfig({ ...latestImportConfig, isDismissed: true });
  };

  const retryImportFn = useCallback(() => {
    dispatch(setCurrentScreen('configureTool'));

    // api call for retry
    const testManagementTool =
      testManagementToolRef.current.split('_')[0] === 'testrail'
        ? `${testManagementToolRef.current.split('_')[0]}s`
        : testManagementToolRef.current.split('_')[0];
    dispatch(setCurrentTestManagementTool(testManagementTool));
    dispatch(
      setSelectedRadioIdMap({
        key: testManagementTool,
        value: 'import-from-tool'
      })
    );
    retryImport(
      latestImportConfig.importId,
      testManagementToolRef.current.split('_')[0]
    ).then((data) => {
      const keys = Object.keys(data.credentials);
      keys.forEach((key) =>
        dispatch(setTestRailsCred({ key, value: data.credentials[key] }))
      );
    });
    setShowModal(false);
    dispatch(setImportStarted(false));
    navigate('/import');
  }, [dispatch, latestImportConfig.importId, navigate]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFirstButtonClick = (toastData, importType) => () => {
    if (importType === FAILURE) {
      setShowModal(true);
      dismissNotification(toastData, importType, 'showModal');
    } else {
      dismissNotification(toastData, importType);
      navigate('/');
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSecondButtonClick = (toastData, buttonData, importType) => () => {
    dismissNotification(toastData, importType);
    if (buttonData === 'Retry Import') retryImportFn();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleNotificationClose = (importType) => (toastData) => {
    dismissNotification(toastData, importType);
  };

  const showNotification = useCallback(
    (notificationConfig) => {
      notify(
        <Notifications
          id="import-notification"
          title={
            notificationConfig?.totalProjects > notificationConfig?.successCount
              ? `${notificationConfig?.successCount}/${notificationConfig.totalProjects} ${notificationConfig?.data?.title}`
              : notificationConfig?.data?.title
          }
          description={notificationConfig?.data?.description}
          headerIcon={notificationConfig?.data?.headerIcon}
          handleClose={handleNotificationClose(
            notificationConfig?.importStatus
          )}
          actionButtons={(toastData) => (
            <>
              <TMButton
                onClick={handleFirstButtonClick(
                  toastData,
                  notificationConfig?.importStatus
                )}
                variant="minimal"
                colors="white"
              >
                {notificationConfig?.data?.firstButton}
              </TMButton>
              <TMButton
                variant="minimal"
                wrapperClassName="text-base-600"
                onClick={handleSecondButtonClick(
                  toastData,
                  notificationConfig?.data?.secondButton,
                  notificationConfig?.importStatus
                )}
              >
                {notificationConfig?.data?.secondButton}
              </TMButton>
            </>
          )}
        />,
        {
          position: 'top-right',
          duration: INFINITY
        }
      );
    },
    [handleFirstButtonClick, handleSecondButtonClick, handleNotificationClose]
  );

  const checkImportStatusClickHandler = useCallback(
    (id = null) => {
      getQuickImportStatus(latestImportConfig?.importId || id).then((data) => {
        testManagementToolRef.current = data.import_type;
        dispatch(setCurrentImportStatus(data.status));
        if (data.status === ONGOING) {
          showNotification({ data: WARNING_DATA, importStatus: ONGOING });
        } else if (data.status === COMPLETED) {
          if (data.success_count < data.total) {
            showNotification({
              data: FAILURE_DATA,
              importStatus: FAILURE,
              projects: data.projects,
              tool: data.import_type,
              totalProjects: data.total,
              successCount: data.success_count
            });
            setProjectsForModal(data?.projects);
          } else {
            showNotification({ data: SUCCESS_DATA });
          }
        }
        setLatestImportConfig((prevState) => ({
          status: data.status,
          importId: prevState.importId,
          isDismissed: prevState.isDismissed
        }));
      });
    },
    [latestImportConfig, showNotification, dispatch]
  );

  const onModalCloseHandler = () => {
    setShowModal(false);
    dispatch(setImportStarted(false));
  };

  useEffect(() => {
    getLatestQuickImportConfig().then(
      ({ status, is_dismissed: isDismissed, import_id: importId }) => {
        setLatestImportConfig({ status, isDismissed, importId });
        if (!isDismissed && status !== ONGOING)
          checkImportStatusClickHandler(importId);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showRibbonNotification =
    latestImportConfig?.importId &&
    latestImportConfig?.status === ONGOING &&
    !latestImportConfig?.isDismissed;

  return (
    <>
      {showRibbonNotification && (
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
      {showModal && (
        <TMModal
          show={showModal}
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
            {projectsForModal &&
              projectsForModal.map((project) => (
                <div className="border-base-100 text-base-500 flex place-content-between border-b p-3 text-xs">
                  <span className="text-base-900 inline-flex flex-1 text-sm font-medium">
                    {project.name}
                  </span>
                  <span className="ml-6 inline-flex flex-1">
                    {project.status === FAILURE ? (
                      <>
                        <ErrorIcon className="text-danger-600" />
                        <span className="ml-2">{project.reason}</span>
                      </>
                    ) : (
                      <CheckCircleRoundedIcon className="text-success-600" />
                    )}
                  </span>
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
