import React from 'react';
import {
  MdCheckCircleOutline,
  MdErrorOutline,
  MdInfoOutline,
  MdWarningAmber,
  Notifications,
  notify
} from '@browserstack/bifrost';

const getIcon = (type) => {
  switch (type) {
    case 'error':
      return <MdErrorOutline className="text-danger-600 h-6 w-6 leading-5" />;
    case 'success':
      return <MdCheckCircleOutline className="text-success-600 h-6 w-6 " />;
    case 'warning':
      return <MdWarningAmber className="text-attention-600 h-6 w-6 " />;
    default:
      return <MdInfoOutline className="text-brand-600 h-6 w-6 leading-5" />;
  }
};

export const o11yNotify = ({
  type = '',
  title = '',
  description = '',
  actionButtons = null,
  duration = 0
}) => {
  notify(
    <Notifications
      title={title}
      description={description}
      headerIcon={getIcon(type)}
      handleClose={(toastData) => {
        notify.remove(toastData.id);
      }}
      actionButtons={actionButtons}
    />,
    {
      position: 'top-right',
      duration: duration || 3000
    }
  );
};
