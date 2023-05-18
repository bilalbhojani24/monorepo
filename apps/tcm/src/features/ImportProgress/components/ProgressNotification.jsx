import React, { useEffect } from 'react';
import {
  MdCheckCircleOutline,
  //   MdErrorOutline,
  notify
} from '@browserstack/bifrost';
import { TMNotifications } from 'common/bifrostProxy';

import useProgressNotification from './useProgressNotification';

const ProgressNotification = () => {
  const AUTO_CLOSE_TIMER = 5000;

  const { showNotification, removeNotification } = useProgressNotification();

  useEffect(() => {
    if (showNotification) {
      notify(
        <TMNotifications
          title="Projects Imported" // yaha mujhe count leke aana hai.
          description="Your import has been completed. You can  check the overall status of your import."
          //   actionButtons={(toastData) => (
          //     <>
          //       <TMButton
          //         onClick={handleFirstButtonClick(toastData)}
          //         variant="minimal"
          //         colors="white"
          //       >
          //         {notificationData?.firstButton}
          //       </TMButton>
          //       <TMButton
          //         variant="minimal"
          //         wrapperClassName="text-base-600"
          //         onClick={handleSecondButtonClick(toastData)}
          //       >
          //         {notificationData?.secondButton}
          //       </TMButton>
          //     </>
          //   )}
          headerIcon={
            <MdCheckCircleOutline className="text-success-400 h-6 w-6" />
          }
          handleClose={(toastData) => {
            removeNotification(toastData, notify);
          }}
        />,
        {
          position: 'top-right',
          duration: AUTO_CLOSE_TIMER,
          autoClose: true,
          id: 'progress-notification'
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showNotification]);

  return '';
};

export default ProgressNotification;
