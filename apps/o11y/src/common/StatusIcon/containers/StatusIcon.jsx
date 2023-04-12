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

const commonStatusClass = "'w-4 h-4 flex-shrink-0";
export default function StatusIcon({ status, customClass, noColor }) {
  if (status === TEST_STATUS.PASS) {
    return (
      <MdOutlineCheckCircleOutline
        className={twClassNames(
          commonStatusClass,
          {
            'text-success-500': !noColor,
            'text-base-400': noColor
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
          commonStatusClass,
          'fill-brand-500',
          {
            'text-brand-500': !noColor,
            'text-base-400': noColor
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
          commonStatusClass,
          {
            'text-danger-500': !noColor,
            'text-base-400': noColor
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
          commonStatusClass,
          {
            'text-attention-500': !noColor,
            'text-base-400': noColor
          },
          customClass
        )}
      />
    );
  }

  return (
    <MdRemoveCircleOutline
      className={twClassNames(
        commonStatusClass,
        {
          'text-base-500': !noColor,
          'text-base-400': noColor
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
