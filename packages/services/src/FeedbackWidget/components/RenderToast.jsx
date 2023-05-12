import React, { useContext, useEffect } from 'react';
import Notifications from '../../../../bifrost/modules/Notifications/index';
import {
  NotificationsContainer,
  notify
} from '../../../../bifrost/modules/Notifications/notificationsUtils';

import { FeedbackWidgetContextData } from '../context/feedbackWidgetContext';

const RenderToast = () => {
  const { show, title, description } = useContext(FeedbackWidgetContextData);

  const showNotification = () => {
    notify(
      <Notifications
        title={'Some Title'}
        description={'Some description'}
        body={<div>Show</div>}
        footer={<div>Show</div>}
      />,
      {
        position: 'bottom-right',
        autoClose: true
        // duration: 4000
      }
    );
  };

  useEffect(() => {
    if (show) showNotification();
  }, [show]);

  return <NotificationsContainer />;
};

export default RenderToast;
