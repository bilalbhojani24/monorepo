import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import {
  CalendarIcon,
  ExclamationCircleIcon,
  QuestionMarkCircleIcon
} from '../Icon';
import Tooltip from '../Tooltip';
import TooltipBody from '../TooltipBody';

import { FieldButton } from './components/Button';
import { DateField } from './components/DateField';

const DatePickerInputGroup = ({
  triggerRef,
  fieldProps,
  buttonProps,
  groupProps,
  isOpen,
  errorMessage,
  wrapperClassName,
  disabled,
  disabledMessage
}) => (
  <div
    className={twClassNames(wrapperClassName, {
      'pointer-events-none': disabled
    })}
  >
    <div
      {...groupProps}
      ref={triggerRef}
      className={twClassNames(
        'border-base-300 hover:border-brand-500 flex w-full rounded-md border',
        {
          'border-danger-300': errorMessage
        }
      )}
    >
      <div className="relative flex w-full items-center rounded-md rounded-r-none p-1 py-2 pl-3">
        <DateField {...fieldProps} disabled={disabled} />
      </div>
      {errorMessage ? (
        <div className="flex flex-col justify-around">
          <ExclamationCircleIcon
            className="text-danger-500 mr-4 h-5 w-5"
            aria-hidden="true"
          />
        </div>
      ) : null}
      {disabled ? (
        <div className="flex flex-col justify-around">
          <Tooltip
            content={
              <TooltipBody wrapperClassName="mb-0">
                {disabledMessage}
              </TooltipBody>
            }
            defaultOpen
            theme="dark"
          >
            <QuestionMarkCircleIcon
              className="text-base-400 mr-4 h-5 w-5"
              aria-hidden="true"
            />
          </Tooltip>
        </div>
      ) : (
        <FieldButton {...buttonProps} isPressed={isOpen}>
          <CalendarIcon className="text-base-400 h-5 w-5" />
        </FieldButton>
      )}
    </div>
    <p className="text-danger-600 mt-1.5 text-sm font-normal leading-5">
      {errorMessage}
    </p>
  </div>
);

DatePickerInputGroup.propTypes = {
  isOpen: PropTypes.bool,
  triggerRef: PropTypes.shape({}).isRequired,
  fieldProps: PropTypes.shape({}).isRequired,
  buttonProps: PropTypes.shape({}).isRequired,
  groupProps: PropTypes.shape({}).isRequired,
  errorMessage: PropTypes.string,
  wrapperClassName: PropTypes.string,
  disabledMessage: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};
DatePickerInputGroup.defaultProps = {
  isOpen: false,
  errorMessage: null,
  wrapperClassName: '',
  disabled: false
};

export default DatePickerInputGroup;
