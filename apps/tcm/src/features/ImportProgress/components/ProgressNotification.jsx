import React, { useEffect } from 'react';
import {
  MdCheckCircleOutline,
  MdOutlineWarningAmber
} from '@browserstack/bifrost';
import { TMButton, TMNotifications } from 'common/bifrostProxy';

import { IMPORT_STATUS } from '../const/immutables';
import { setNotificationConfig } from '../slices/importProgressSlice';

import useProgressNotification from './useProgressNotification';

const ProgressNotification = () => {
  const AUTO_CLOSE_TIMER = 10000;

  const {
    notify,
    dispatch,
    timerRef,
    importStatus,
    notificationConfig,
    importDetails,
    removeNotification,
    handleFirstButtonClick,
    handleSecondButtonClick
  } = useProgressNotification();

  useEffect(() => {
    if (notificationConfig?.show) {
      notify(
        <TMNotifications
          title={`${importDetails?.successfullyImportedProjects}/${importDetails?.totalProjects} Projects Imported`}
          description="Your import has been completed. You can  check the overall status of your import."
          actionButtons={() => (
            <>
              <TMButton
                onClick={() => handleFirstButtonClick(notificationConfig?.id)}
                variant="minimal"
                colors="white"
              >
                View Report
              </TMButton>
              <TMButton
                variant="minimal"
                wrapperClassName="text-base-600"
                onClick={() => handleSecondButtonClick(notificationConfig?.id)}
              >
                Go to All Projects
              </TMButton>
            </>
          )}
          headerIcon={
            importStatus === IMPORT_STATUS.SUCCESS ? (
              <MdCheckCircleOutline className="text-success-400 h-6 w-6" />
            ) : (
              <MdOutlineWarningAmber className="text-attention-400 h-6 w-6" />
            )
          }
          handleClose={() => dispatch(setNotificationConfig({ show: false }))}
        />,
        {
          position: 'top-right',
          duration: AUTO_CLOSE_TIMER,
          autoClose: true,
          id: notificationConfig?.id
        }
      );

      timerRef.current = setTimeout(() => {
        removeNotification(notificationConfig?.id);
      }, AUTO_CLOSE_TIMER);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationConfig?.show]);

  return '';
};

export default ProgressNotification;
