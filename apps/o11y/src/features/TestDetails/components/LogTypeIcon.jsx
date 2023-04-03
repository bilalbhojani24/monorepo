import React from 'react';
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
  let icon = null;
  if ([LOG_TYPES.HTTP, LOG_TYPES.NETWORK_LOGS].includes(logType)) {
    icon = <MdOutlineNetworkCheck className="text-base-400 h-5 w-5" />;
  }
  if ([LOG_TYPES.TEST_LOG, LOG_TYPES.FAILURE].includes(logType)) {
    icon = <TerminalIcon className="fill-base-400 h-5 w-5" />;
  }
  if ([LOG_TYPES.TEST_SCREENSHOT, LOG_TYPES.TEXT_LOGS].includes(logType)) {
    icon = <SeleniumIcon className="fill-base-400 h-5 w-5" />;
  }
  if (logType === LOG_TYPES.CONSOLE_LOGS) {
    icon = <JSIcon className="fill-base-400 h-5 w-5" />;
  }
  if (logType === LOG_TYPES.DEVICE_LOGS) {
    icon = <DeviceIcon className="fill-base-400 h-5 w-5" />;
  }
  if (logType === LOG_TYPES.APPLICATION_LOGS) {
    icon = <ApplicationIcon className="fill-base-400 h-5 w-5" />;
  }
  return <span className="ml-auto">{icon}</span>;
}

LogTypeIcon.propTypes = {
  logType: PropTypes.oneOf(Object.keys(LOG_TYPES)).isRequired
};
