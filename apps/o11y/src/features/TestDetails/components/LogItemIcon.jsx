import React from 'react';
import {
  MdOutlineErrorOutline,
  MdOutlineReportProblem
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { LOG_LEVELS } from '../constants';

export default function LogItemIcon({ logLevel }) {
  switch (logLevel) {
    case LOG_LEVELS.ERROR:
    case LOG_LEVELS.SEVERE:
      return <MdOutlineErrorOutline className="text-danger-500 mr-2 h-5 w-5" />;
    case LOG_LEVELS.WARNING:
      return (
        <MdOutlineReportProblem className="text-attention-500 mr-2 h-5 w-5" />
      );

    default:
      return null;
  }
}

LogItemIcon.propTypes = {
  logLevel: PropTypes.oneOf(Object.keys(LOG_LEVELS)).isRequired
};
