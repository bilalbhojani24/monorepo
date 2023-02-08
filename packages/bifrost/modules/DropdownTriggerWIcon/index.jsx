import React from 'react';
import PropTypes from 'prop-types';

import { twClassNames } from '../../utils/tailwindUtils';
import { EllipsisVerticalIcon } from '../Icon';

import { DROPDOWN_TRIGGER_TYPES } from './const/DropdownTriggerWIconConst';

import './styles.scss';

const DropdownTriggerWIcon = ({ variant, wrapperClassName, icon }) => (
  <div
    className={twClassNames(
      wrapperClassName,
      'w-fit flex items-center rounded-full bg-base-100 text-base-400 hover:text-base-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-base-100',
      {
        'border-gray rounded-lg border border-2 bg-white p-2':
          variant === DROPDOWN_TRIGGER_TYPES[1]
      }
    )}
  >
    <span className="sr-only">Open options</span>
    {icon || (
      <EllipsisVerticalIcon
        className={twClassNames('h-5 w-5', {
          'text-base-700': variant === DROPDOWN_TRIGGER_TYPES[1]
        })}
        aria-hidden="true"
      />
    )}
  </div>
);

DropdownTriggerWIcon.propTypes = {
  icon: PropTypes.node,
  wrapperClassName: PropTypes.string,
  variant: PropTypes.oneOf(DROPDOWN_TRIGGER_TYPES)
};
DropdownTriggerWIcon.defaultProps = {
  icon: null,
  wrapperClassName: '',
  variant: DROPDOWN_TRIGGER_TYPES[0]
};

export default DropdownTriggerWIcon;
