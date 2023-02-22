import React, { useEffect } from 'react';
import {
  MdCheckCircleOutline,
  MdErrorOutline,
  notify
} from '@browserstack/bifrost';
import { TMNotifications } from 'common/bifrostProxy';

import useNotification from './useNotification';

const Notification = () => {
  const { notification, removeThisToast } = useNotification();

  const headerIcon = (variant) => {
    switch (variant) {
      case 'success':
        return <MdCheckCircleOutline className="text-success-400 h-6 w-6" />;
      case 'error':
        return <MdErrorOutline className="text-danger-400 h-6 w-6" />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (notification?.id) {
      notify(
        <TMNotifications
          title={notification?.title}
          description={notification?.description}
          actionButtons={null}
          headerIcon={headerIcon(notification?.variant)}
          handleClose={(toastData) => {
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
