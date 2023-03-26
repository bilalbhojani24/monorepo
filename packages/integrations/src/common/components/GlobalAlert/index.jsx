import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alerts } from '@browserstack/bifrost';

import {
  clearGlobalAlert,
  globalAlertStateSelector
} from '../../slices/globalAlertSlice';

const GlobalAlert = () => {
  const { kind, title, message, linkText, linkUrl } = useSelector(
    globalAlertStateSelector
  );
  const dispatch = useDispatch();

  const handleDismissButton = () => {
    dispatch(clearGlobalAlert());
  };

  return message ? (
    <Alerts
      title={title}
      description={message}
      modifier={kind}
      linkText={linkText}
      linkUrl={linkUrl}
      dismissButton
      dismissButtonFn={handleDismissButton}
    />
  ) : null;
};
export default GlobalAlert;
