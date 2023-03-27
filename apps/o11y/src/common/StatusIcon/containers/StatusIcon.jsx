import React from 'react';
import {
  MdHelpOutline,
  MdOutlineCancel,
  MdOutlineCheckCircleOutline,
  MdRemoveCircleOutline
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { LoadingIcon } from 'assets/icons/components';
import { TEST_STATUS } from 'constants/common';
import PropTypes from 'prop-types';

export default function StatusIcon({ status, customClass, noColor }) {
  if (status === TEST_STATUS.PASS) {
    return (
      <MdOutlineCheckCircleOutline
        className={twClassNames(
          'w-4 h-4',
          {
            'text-success-500': !noColor
          },
          customClass
        )}
      />
    );
  }
  if (status === TEST_STATUS.PENDING) {
    return (
      <LoadingIcon
        className={twClassNames(
          'w-4 h-4 fill-brand-500',
          {
            'text-brand-500': !noColor
          },
          customClass
        )}
      />
    );
  }
  if (status === TEST_STATUS.FAIL) {
    return (
      <MdOutlineCancel
        className={twClassNames(
          'w-4 h-4',
          {
            'text-danger-500': !noColor
          },
          customClass
        )}
      />
    );
  }
  if (status === TEST_STATUS.TIMEOUT) {
    return (
      <MdHelpOutline
        className={twClassNames(
          'w-4 h-4',
          {
            'text-attention-500': !noColor
          },
          customClass
        )}
      />
    );
  }

  return (
    <MdRemoveCircleOutline
      className={twClassNames(
        'w-4 h-4',
        {
          'text-base-500': !noColor
        },
        customClass
      )}
    />
  );
}

StatusIcon.propTypes = {
  status: PropTypes.string.isRequired,
  customClass: PropTypes.string,
  noColor: PropTypes.bool
};

StatusIcon.defaultProps = {
  customClass: '',
  noColor: false
};
