import React from 'react';
import PropTypes from 'prop-types';

import { CalendarIcon } from '../Icon';

import { FieldButton } from './components/Button';
import { DateField } from './components/DateField';

const DatepickerTrigger = ({
  triggerRef,
  fieldProps,
  buttonProps,
  groupProps,
  isOpen
}) => (
  <div
    {...groupProps}
    ref={triggerRef}
    className="border-base-300 hover:border-brand-500 flex w-full rounded-md border"
  >
    <div className="relative flex w-full items-center rounded-md rounded-r-none p-1 py-2 pl-3">
      <DateField {...fieldProps} />
    </div>
    <FieldButton {...buttonProps} isPressed={isOpen}>
      <CalendarIcon className="text-base-400 h-5 w-5" />
    </FieldButton>
  </div>
);

DatepickerTrigger.propTypes = {
  isOpen: PropTypes.bool,
  triggerRef: PropTypes.shape({}).isRequired,
  fieldProps: PropTypes.shape({}).isRequired,
  buttonProps: PropTypes.shape({}).isRequired,
  groupProps: PropTypes.shape({}).isRequired
};
DatepickerTrigger.defaultProps = {
  isOpen: false
};

export default DatepickerTrigger;
