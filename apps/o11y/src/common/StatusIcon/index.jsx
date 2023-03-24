import React from 'react';
import {
  MdHelpOutline,
  MdOutlineCancel,
  MdOutlineCheckCircleOutline,
  MdRemoveCircleOutline
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import O11yLoader from 'common/O11yLoader';
import { TEST_STATUS } from 'constants/common';
import PropTypes from 'prop-types';

export default function StatusIcon({ status, wrapperClassName }) {
  if (status === TEST_STATUS.PASS) {
    return (
      <MdOutlineCheckCircleOutline
        className={twClassNames('text-success-600 w-4 h-4', wrapperClassName)}
      />
    );
  }
  if (status === TEST_STATUS.PENDING) {
    return (
      <O11yLoader
        className={twClassNames('text-brand-600 w-4 h-4', wrapperClassName)}
      />
    );
  }
  if (status === TEST_STATUS.FAIL) {
    return (
      <MdOutlineCancel
        className={twClassNames('text-danger-600 w-4 h-4', wrapperClassName)}
      />
    );
  }
  if (status === TEST_STATUS.TIMEOUT) {
    return (
      <MdHelpOutline
        className={twClassNames('text-attention-600 w-4 h-4', wrapperClassName)}
      />
    );
  }
  return (
    <MdRemoveCircleOutline
      className={twClassNames('text-base-600 w-4 h-4', wrapperClassName)}
    />
  );
}

StatusIcon.propTypes = {
  status: PropTypes.string.isRequired,
  wrapperClassName: PropTypes.string
};

StatusIcon.defaultProps = {
  wrapperClassName: ''
};
