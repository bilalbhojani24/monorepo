import React, { useEffect } from 'react';
import { notify } from '@browserstack/bifrost';
import { TMNotifications } from 'common/bifrostProxy';

import useNotification from './useNotification';

const Notification = () => {
  const { notification, removeThisToast } = useNotification();

  useEffect(() => {
    if (notification?.id) {
      notify(
        <TMNotifications
          title={notification?.title}
          description={notification?.description}
          actionButtons={null}
          // headerIcon={
          //   <CheckCircleIcon className="text-success-400 h-6 w-6" />
          // }
          handleClose={(toastData) => {
            debugger;
            removeThisToast(toastData.id);
            notify.remove(toastData.id);
          }}
        />,
        {
          position: 'top-right',
          duration: 4000,
          autoClose: true,
          id: notification?.id
        }
      );
    }
  }, [notification?.id]);

  return '';
};

export default Notification;
