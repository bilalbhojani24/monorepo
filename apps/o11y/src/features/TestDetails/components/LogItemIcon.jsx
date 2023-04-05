import React from 'react';
import {
  MdOutlineErrorOutline,
  MdOutlineReportProblem
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { LOG_LEVELS } from '../constants';

export default function LogItemIcon({ logLevel, wrapperClassName }) {
  switch (logLevel) {
    case LOG_LEVELS.ERROR:
    case LOG_LEVELS.SEVERE:
      return (
        <MdOutlineErrorOutline
          className={twClassNames(
            'text-danger-500 mr-2 h-4 w-4',
            wrapperClassName
          )}
        />
      );
    case LOG_LEVELS.WARNING:
      return (
        <MdOutlineReportProblem
          className={twClassNames(
            'text-attention-500 mr-2 h-4 w-4',
            wrapperClassName
          )}
        />
      );

    default:
      return null;
  }
}

LogItemIcon.propTypes = {
  logLevel: PropTypes.oneOf(Object.keys(LOG_LEVELS)).isRequired,
  wrapperClassName: PropTypes.string
};

LogItemIcon.defaultProps = {
  wrapperClassName: ''
};
