import React, { useContext, useEffect, useRef } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Combobox } from '@headlessui/react';
import * as Popover from '@radix-ui/react-popover';

import { ComboboxContextData } from '../../shared/comboboxContext';
import { func, string } from '../../shared/proptypesConstants';
import { ExclamationCircleIcon } from '../Icon';
import Loader from '../Loader';

import TriggerButton from './component/TriggerButton';
import { renderMultiOptions, renderSingleOptions } from './helper';

const ComboboxTrigger = ({ onInputValueChange, placeholder }) => {
  const buttonRef = useRef();
  const comboInputRef = useRef();

  const { isMulti, setWidth, errorText, loading, open } =
    useContext(ComboboxContextData);

  useEffect(() => {
    if (open) setWidth(buttonRef.current.offsetWidth);
  }, [setWidth, open]);

  return (
    <Popover.Trigger asChild ref={buttonRef}>
      <div className="relative">
        <Combobox.Input
          placeholder={loading ? null : placeholder}
          className={twClassNames(
            'border-base-300 focus:border-brand-500 focus:ring-brand-500 w-full rounded-md border bg-white py-2 pr-14 pl-3 shadow-sm focus:outline-none focus:ring-1 sm:text-sm text-ellipsis',
            {
              'border-danger-600': errorText
            }
          )}
          onChange={onInputValueChange}
          displayValue={(dv) => {
            if (loading) return null;
            return isMulti && Array.isArray(dv)
              ? renderMultiOptions(dv)
              : renderSingleOptions(dv);
          }}
          ref={comboInputRef}
          readOnly={loading}
        />
        {loading && (
          <span className="absolute inset-y-0 left-1 flex items-center space-x-2 rounded-r-md px-2 focus:outline-none">
            <Loader wrapperStyle="text-base-200 fill-base-400 " />
            <span>Loading...</span>
          </span>
        )}
        {errorText && (
          <span className="absolute inset-y-0 right-5 flex items-center rounded-r-md px-2 focus:outline-none">
            <ExclamationCircleIcon
              className="text-danger-500 h-5 w-5"
              aria-hidden="true"
            />
          </span>
        )}
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
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
  onInputValueChange: func,
  placeholder: string
};
ComboboxTrigger.defaultProps = {
  onInputValueChange: null,
  placeholder: ''
};

export default ComboboxTrigger;
