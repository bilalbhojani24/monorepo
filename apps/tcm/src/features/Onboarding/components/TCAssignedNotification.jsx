import React, { useEffect } from 'react';
import {
  MdCheckCircleOutline,
  MdOutlineWarningAmber
} from '@browserstack/bifrost';
import { TMButton, TMNotifications } from 'common/bifrostProxy';

import useTCAssignedNotification from './useTCAssignedNotification';

const TCAssignedNotification = () => {
  const {
    notify,
    notificationConfig,
    importDetails,
    removeNotification,
    handleFirstButtonClick,
    handleSecondButtonClick
  } = useTCAssignedNotification();

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
                wrapperClassName="text-base-700 hover:text-brand-500"
              >
                View Report
              </TMButton>
              <TMButton
                variant="minimal"
                wrapperClassName="text-base-700 hover:text-brand-500"
                onClick={() => handleSecondButtonClick(notificationConfig?.id)}
              >
                Go to All Projects
              </TMButton>
            </>
          )}
          headerIcon={
            importDetails?.successfullyImportedProjects ===
            importDetails?.totalProjects ? (
              <MdCheckCircleOutline className="text-success-400 h-6 w-6" />
            ) : (
              <MdOutlineWarningAmber className="text-attention-400 h-6 w-6" />
            )
          }
          handleClose={() => removeNotification(notificationConfig?.id)}
        />,
        {
          position: 'top-right',
          autoClose: false,
          id: notificationConfig?.id
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationConfig?.show]);

  return '';
};

export default TCAssignedNotification;
