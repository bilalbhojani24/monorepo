import React, { useEffect } from 'react';
import { MdHowToReg } from '@browserstack/bifrost';
import { TMButton, TMNotifications } from 'common/bifrostProxy';

import useTCAssignedNotification from './useTCAssignedNotification';

const TCAssignedNotification = () => {
  const {
    notify,
    tcAssignedNotificationConfig,
    timerFinished,
    removeNotification,
    handleFirstButtonClick,
    handleSecondButtonClick
  } = useTCAssignedNotification();

  useEffect(() => {
    if (tcAssignedNotificationConfig?.show && timerFinished) {
      notify(
        <TMNotifications
          title="Welcome User"
          description="You have been marked as an Owner for few test cases."
          actionButtons={() => (
            <>
              <TMButton
                onClick={() =>
                  handleFirstButtonClick(tcAssignedNotificationConfig?.id)
                }
                variant="minimal"
                colors="white"
                wrapperClassName="text-base-700 hover:text-brand-500"
              >
                View Test Cases
              </TMButton>
              <TMButton
                variant="minimal"
                wrapperClassName="text-base-700 hover:text-brand-500"
                onClick={() =>
                  handleSecondButtonClick(tcAssignedNotificationConfig?.id)
                }
              >
                Dismiss
              </TMButton>
            </>
          )}
          headerIcon={<MdHowToReg className="text-base-600 h-6 w-6" />}
          handleClose={() =>
            removeNotification(tcAssignedNotificationConfig?.id)
          }
        />,
        {
          position: 'top-right',
          autoClose: false,
          id: tcAssignedNotificationConfig?.id
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tcAssignedNotificationConfig?.show, timerFinished]);

  return '';
};

export default TCAssignedNotification;
