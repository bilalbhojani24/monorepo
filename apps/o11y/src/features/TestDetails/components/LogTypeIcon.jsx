import React from 'react';
// import 'images/testops/icons/test_commands.svg'; // points to selenium, mistake ?
import { MdOutlineNetworkCheck } from '@browserstack/bifrost';
import {
  ApplicationIcon,
  DeviceIcon,
  JSIcon,
  SeleniumIcon,
  TerminalIcon
} from 'assets/icons/components';
import PropTypes from 'prop-types';

import { LOG_TYPES } from '../constants';

export default function LogTypeIcon({ logType }) {
  if ([LOG_TYPES.HTTP, LOG_TYPES.NETWORK_LOGS].includes(logType)) {
    return <MdOutlineNetworkCheck className="text-base-500 h-3 w-3" />;
  }
  if ([LOG_TYPES.TEST_LOG, LOG_TYPES.FAILURE].includes(logType)) {
    return <TerminalIcon className="text-base-500 h-3 w-3" />;
  }
  if ([LOG_TYPES.TEST_SCREENSHOT, LOG_TYPES.TEXT_LOGS].includes(logType)) {
    return (
      <SeleniumIcon className="text-base-500 h-3 w-3" /> // need to put test commands icon
    );
  }
  if (logType === LOG_TYPES.CONSOLE_LOGS) {
    return <JSIcon className="text-base-500 h-3 w-3" />;
  }
  if (logType === LOG_TYPES.DEVICE_LOGS) {
    return <DeviceIcon className="text-base-500 h-3 w-3" />;
  }
  if (logType === LOG_TYPES.APPLICATION_LOGS) {
    return <ApplicationIcon className="text-base-500 h-3 w-3" />;
  }
  return null;
}

LogTypeIcon.propTypes = {
  logType: PropTypes.oneOf(Object.keys(LOG_TYPES)).isRequired
};
