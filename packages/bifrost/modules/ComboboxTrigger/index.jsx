import React, { useContext, useEffect, useRef } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Combobox } from '@headlessui/react';
import * as Popover from '@radix-ui/react-popover';

import { ComboboxContextData } from '../../shared/comboboxContext';
import { func, string } from '../../shared/proptypesConstants';

import TriggerButton from './component/TriggerButton';
import { renderMultiOptions, renderSingleOptions } from './helper';

const ComboboxTrigger = ({ onInputValueChange, placeholder }) => {
  const buttonRef = useRef();
  const comboInputRef = useRef();
  const { isMulti, setWidth, errorText, open } =
    useContext(ComboboxContextData);

  useEffect(() => {
    if (open) setWidth(buttonRef.current.offsetWidth);
  }, [setWidth, open]);

  return (
    <Popover.Trigger asChild ref={buttonRef}>
      <div className="relative">
        <Combobox.Input
          placeholder={placeholder}
          className={twClassNames(
            'border-base-300 focus:border-brand-500 focus:ring-brand-500 w-full rounded-md border bg-white py-2 pl-3 pr-14 shadow-sm focus:outline-none focus:ring-1 sm:text-sm text-ellipsis',
            { 'border-danger-600': errorText }
          )}
          onChange={onInputValueChange}
          displayValue={(dv) =>
            isMulti && Array.isArray(dv)
              ? renderMultiOptions(dv)
              : renderSingleOptions(dv)
          }
          ref={comboInputRef}
        />
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
