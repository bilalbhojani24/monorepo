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
  <div {...groupProps} ref={triggerRef} className="group flex">
    <div className="border-base-300 group-hover:border-base-400 group-focus-within:border-brand-600 group-focus-within:group-hover:border-brand-600 relative flex items-center rounded-l-md border bg-white p-1 pr-10 transition-colors">
      <DateField {...fieldProps} />
    </div>
    <FieldButton {...buttonProps} isPressed={isOpen}>
      <CalendarIcon className="text-base-700 group-focus-within:text-brand-700 h-5 w-5" />
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
