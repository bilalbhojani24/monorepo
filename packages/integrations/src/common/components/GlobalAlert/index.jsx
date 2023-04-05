import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alerts } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import {
  clearGlobalAlert,
  globalAlertStateSelector
} from '../../slices/globalAlertSlice';

const GlobalAlert = ({ className }) => {
  const { kind, title, message, linkText, linkUrl } = useSelector(
    globalAlertStateSelector
  );
  const dispatch = useDispatch();

  const handleDismissButton = () => {
    dispatch(clearGlobalAlert());
  };

  return message ? (
    <div className={className}>
      <Alerts
        title={title}
        description={message}
        modifier={kind}
        linkText={linkText}
        linkUrl={linkUrl}
        dismissButton
        dismissButtonFn={handleDismissButton}
        alertLinkPosition="inline"
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
