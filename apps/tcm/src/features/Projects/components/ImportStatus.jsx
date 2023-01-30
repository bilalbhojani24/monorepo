import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Banner, Notifications, notify } from '@browserstack/bifrost';
import {
  dismissNotificationForImport,
  getLatestQuickImportConfig,
  getQuickImportStatus
} from 'api/import.api';
import {
  AccessTimeFilledRoundedIcon,
  CheckCircleRoundedIcon,
  ErrorIcon
} from 'assets/icons';
import {
  TMButton,
  TMModal,
  TMModalBody,
  TMModalFooter,
  TMModalHeader
} from 'common/bifrostProxy';

import { setCurrentScreen } from '../../ImportFlow/slices/importSlice';
import {
  COMPLETED,
  FAILURE,
  FAILURE_DATA,
  INFINITY,
  ONGOING,
  SUCCESS_DATA,
  WARNING_DATA
} from '../const/importConst';

const ImportStatus = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [latestImportConfig, setLatestImportConfig] = useState({});
  const [notification, setNotification] = useState({});
  const [showModal, setShowModal] = useState(false);

  const dismissNotification = (toastData) => {
    notify.remove(toastData.id);
    if (notification.data.type === ONGOING) return;
    dismissNotificationForImport(latestImportConfig.importId);
    setLatestImportConfig({ ...latestImportConfig, isDismissed: true });
  };

  const checkImportStatusClickHandler = useCallback(
    (id = null) => {
      getQuickImportStatus(latestImportConfig?.importId || id).then((data) => {
        if (data.status === ONGOING) {
          setNotification({ show: true, data: WARNING_DATA });
        } else if (data.status === COMPLETED) {
          if (data.success_count < data.total) {
            setNotification({
              show: true,
              data: FAILURE_DATA,
              projects: data.projects,
              tool: data.import_type,
              totalProjects: data.total,
              successCount: data.success_count
            });
          } else setNotification({ show: true, data: SUCCESS_DATA });
        }
        setLatestImportConfig((prevState) => ({
          status: data.status,
          importId: prevState.importId,
          isDismissed: prevState.isDismissed
        }));
      });
    },
    [latestImportConfig]
  );

  const retryImport = () => {
    localStorage.setItem('retryImport', 'true');
    dispatch(setCurrentScreen('configureData'));
    navigate('/import', {
      state: {
        importId: latestImportConfig.importId,
        tool: notification.tool
      }
    });
  };

  const handleFirstButtonClick = (toastData) => () => {
    if (notification.data.type === FAILURE) {
      setShowModal(true);
      dismissNotification(toastData);
      setNotification({ ...notification, show: false });
    } else {
      dismissNotification(toastData);
      navigate('/');
    }
  };

  const handleSecondButtonClick = (toastData, buttonData) => () => {
    dismissNotification(toastData);
    setNotification({ show: false, data: {} });
    if (buttonData === 'Retry Import') retryImport();
  };

  const handleNotificationClose = (toastData) => {
    dismissNotification(toastData);
    setNotification({ show: false, data: {} });
  };

  const onModalCloseHandler = () => {
    setShowModal(false);
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
    latestImportConfig?.importId && latestImportConfig?.status === ONGOING;

  return (
    <>
      {showRibbonNotification && (
        <Banner
          align="extreme"
          description="We’ve started importing your projects which will take some time. We’ll also notify you over email once it’s completed."
          isDismissButton={false}
          placement="top"
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
      {notification.show &&
        !document.querySelector('.go4109123758') && // a hack will remove this post fix from DS team
        notify(
          <Notifications
            id="import-notification"
            title={
              notification?.totalProjects > notification?.successCount
                ? `${notification?.successCount}/${notification.totalProjects} ${notification?.data?.title}`
                : notification?.data?.title
            }
            description={notification?.data?.description}
            headerIcon={notification?.data?.headerIcon}
            handleClose={handleNotificationClose}
            actionButtons={(toastData) => (
              <>
                <TMButton
                  onClick={handleFirstButtonClick(toastData)}
                  variant="minimal"
                  colors="white"
                >
                  {notification?.data?.firstButton}
                </TMButton>
                <TMButton
                  variant="minimal"
                  wrapperClassName="text-base-600"
                  onClick={handleSecondButtonClick(
                    toastData,
                    notification?.data?.secondButton
                  )}
                >
                  {notification?.data?.secondButton}
                </TMButton>
              </>
            )}
          />,
          {
            position: 'top-right',
            duration: INFINITY
          }
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
            <div className="border-base-100 text-base-500 mt-7 border-b p-3 text-xs">
              <span className="inline-flex w-28">Project</span>
              <span className="ml-4">Status</span>
            </div>
            {notification?.projects &&
              notification?.projects.map((project) => (
                <div className="border-base-100 text-base-500 border-b p-3 text-xs">
                  <span className="text-base-900 inline-flex w-28 text-sm">
                    {project.name}
                  </span>
                  {project.status === FAILURE ? (
                    <>
                      <ErrorIcon className="text-attention-600 ml-4" />
                      <span className="ml-2">{project.reason}</span>
                    </>
                  ) : (
                    <CheckCircleRoundedIcon className="text-success-500 ml-4" />
                  )}
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
            <TMButton variant="primary" colors="brand" onClick={retryImport}>
              Retry Import
            </TMButton>
          </TMModalFooter>
        </TMModal>
      )}
    </>
  );
};

export default ImportStatus;
