import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alerts } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import {
  clearGlobalAlert,
  globalAlertStateSelector
} from '../../slices/globalAlertSlice';

const GlobalAlert = ({ className }) => {
  const {
    kind,
    title,
    linkUrl,
    message,
    linkText,
    autoDismiss,
    linkPosition,
    hasMessageBody,
    autoDismissDelay
  } = useSelector(globalAlertStateSelector);
  const dispatch = useDispatch();

  const handleDismissButton = () => {
    dispatch(clearGlobalAlert());
  };

  const handleLinkClick = (url) => {
    window.open(url, '_blank').focus();
  };

  useEffect(() => {
    if (message && autoDismiss && autoDismissDelay) {
      setTimeout(() => {
        dispatch(clearGlobalAlert());
      }, autoDismissDelay * 1000);
    }
  }, [message, dispatch, autoDismiss, autoDismissDelay]);

  return message || !hasMessageBody ? (
    <div className={className}>
      <Alerts
        title={title}
        dismissButton={!autoDismiss}
        modifier={kind}
        linkUrl={linkUrl}
        linkText={linkText}
        description={message}
        alertLinkPosition={linkPosition}
        handleLinkClick={handleLinkClick}
        dismissButtonFn={handleDismissButton}
      />
    </div>
  ) : null;
};

GlobalAlert.propTypes = {
  className: PropTypes.string
};

GlobalAlert.defaultProps = {
  className: ''
};
export default GlobalAlert;
