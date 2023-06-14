import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alerts } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
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
    showAlert,
    autoDismiss,
    linkPosition,
    hasMessageBody,
    autoDismissDelay
  } = useSelector(globalAlertStateSelector);
  const [shouldShow, setShouldShow] = useState(false);
  const dispatch = useDispatch();

  const handleDismissButton = () => {
    setShouldShow(false);
    dispatch(clearGlobalAlert());
  };

  const handleLinkClick = (url) => {
    window.open(url, '_blank').focus();
  };

  useEffect(() => {
    if (message && autoDismiss && autoDismissDelay) {
      setTimeout(() => {
        setShouldShow(false);
        dispatch(clearGlobalAlert());
      }, autoDismissDelay * 1000);
    }
  }, [message, dispatch, autoDismiss, autoDismissDelay]);

  useEffect(() => {
    if ((showAlert && message) || !hasMessageBody) {
      setShouldShow(true);
    } else {
      setShouldShow(false);
    }
  }, [message, showAlert, hasMessageBody]);

  return (
    <div className={twClassNames({ [`${className}`]: shouldShow })}>
      <Alerts
        show={shouldShow}
        title={title}
        dismissButton={!autoDismiss}
        modifier={kind}
        linkUrl={linkUrl}
        detailsNode={<p className="underline">{linkText}</p>}
        alertLinkPosition={linkPosition}
        handleLinkClick={handleLinkClick}
        description={message}
        dismissButtonFn={handleDismissButton}
      />
    </div>
  );
};

GlobalAlert.propTypes = {
  className: PropTypes.string
};

GlobalAlert.defaultProps = {
  className: ''
};
export default GlobalAlert;
