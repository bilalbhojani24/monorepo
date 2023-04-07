import React, { useContext, useEffect, useRef } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Combobox } from '@headlessui/react';
import * as Popover from '@radix-ui/react-popover';
import { func, node, string } from 'prop-types';

import { ComboboxContextData } from '../../shared/comboboxContext';
import { ExclamationCircleIcon } from '../Icon';
import Loader from '../Loader';

import TriggerButton from './component/TriggerButton';
import { renderMultiOptions, renderSingleOptions } from './helper';

const ComboboxTrigger = ({ onInputValueChange, placeholder, leadingIcon }) => {
  const buttonRef = useRef();
  const comboInputRef = useRef();

  const { isMulti, setWidth, errorText, isLoading, open, disabled, value } =
    useContext(ComboboxContextData);

  useEffect(() => {
    if (open) {
      setWidth(buttonRef.current?.offsetWidth);
      comboInputRef.current.focus();
    }
  }, [setWidth, open]);

  useEffect(() => {
    comboInputRef.current.value = '';
  }, [value]);

  return (
    <Popover.Trigger ref={buttonRef} asChild>
      <div
        className={twClassNames(
          'border-base-300 focus-within:border-brand-500 focus-within:ring-brand-500 relative flex items-center border px-2 focus-within:outline-none focus-within:ring-1 py-2 rounded-md',
          {
            'pr-14': isMulti,
            'pr-8': errorText,
            'border-danger-600': errorText,
            'cursor-not-allowed border-base-200 bg-base-50 text-base-500':
              disabled,
            'border-base-200 bg-base-50 text-base-500 pr-8': isLoading
          }
        )}
      >
        {leadingIcon && <div className="pr-2">{leadingIcon}</div>}
        {!isMulti && !open && value?.image && (
          <img
            src={value.image}
            alt={value.label}
            className="mr-3 h-5 w-5 shrink-0 rounded-full"
          />
        )}
        <Combobox.Input
          key={open}
          placeholder={isLoading ? null : placeholder}
          className={twClassNames(
            'flex-1 focus:ring-0 focus-outline-0 focus-border-none bg-white border-0 sm:text-sm flex-1 p-0',
            {
              'bg-base-50': disabled || isLoading
            }
          )}
          onChange={(e) => {
            onInputValueChange(e);
          }}
          displayValue={(dv) => {
            if (open) return '';
            return isMulti && Array.isArray(dv)
              ? renderMultiOptions(dv)
              : renderSingleOptions(dv);
          }}
          ref={comboInputRef}
          readOnly={isLoading}
          autoComplete="off"
        />
        <div className="flex items-center space-x-2">
          {isLoading && (
            <span className="text-base-500 flex items-center space-x-2 rounded-r-md focus:outline-none">
              <Loader wrapperStyle="text-base-200 fill-base-400" />
            </span>
          )}
          {errorText && (
            <span className="flex items-center rounded-r-md focus:outline-none">
              <ExclamationCircleIcon
                className="text-danger-500 h-5 w-5"
                aria-hidden="true"
              />
            </span>
          )}
        </div>

        <Combobox.Button
          className="absolute inset-y-0 right-0 flex w-full items-center justify-end rounded-r-md px-2 focus:outline-none"
          onClick={(e) => {
            if (open && isMulti) {
              e.preventDefault();
              comboInputRef.current.focus();
            }
          }}
        >
          {({ value: buttonValue }) => (
            <TriggerButton
              value={buttonValue?.length}
              isMulti={isMulti}
              ref={comboInputRef}
            />
          )}
        </Combobox.Button>
      </div>
    </Popover.Trigger>
  );
};

ComboboxTrigger.propTypes = {
  leadingIcon: node,
  onInputValueChange: func,
  placeholder: string
};
ComboboxTrigger.defaultProps = {
  leadingIcon: null,
  onInputValueChange: null,
  placeholder: ''
};

export default ComboboxTrigger;
