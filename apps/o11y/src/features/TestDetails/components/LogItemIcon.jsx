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
      return <MdOutlineErrorOutline className="" />;
    case LOG_LEVELS.WARNING:
      return <MdOutlineReportProblem className="" />;

    default:
      return null;
  }
}

LogItemIcon.propTypes = {
  logLevel: PropTypes.oneOf(Object.keys(LOG_LEVELS)).isRequired
};
