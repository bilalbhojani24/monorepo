import React, { useEffect, useRef } from 'react';
import {
  MdCheckCircleOutline,
  MdErrorOutline,
  notify
} from '@browserstack/bifrost';
import { TMNotifications } from 'common/bifrostProxy';

import useNotification from './useNotification';

const Notification = () => {
  const timerRef = useRef();
  const AUTO_CLOSE_TIMER = 5000;
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

  const notificationGarbageCollector = (toastData) => {
    removeThisToast(toastData.id);
    notify.remove(toastData.id);
    clearTimeout(timerRef.current);
  };

  useEffect(() => {
    if (notification?.id) {
      notify(
        <TMNotifications
          isCondensed={notification?.isCondensed || false}
          title={notification?.title}
          description={notification?.description || null}
          actionButtons={null}
          headerIcon={headerIcon(notification?.variant)}
          handleClose={notificationGarbageCollector}
        />,
        {
          position: 'top-right',
          duration: AUTO_CLOSE_TIMER,
          // autoClose: true,
          id: notification?.id
        }
      );

      timerRef.current = setTimeout(() => {
        notificationGarbageCollector(notification);
      }, AUTO_CLOSE_TIMER);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification?.id]);

  return '';
};

export default Notification;
