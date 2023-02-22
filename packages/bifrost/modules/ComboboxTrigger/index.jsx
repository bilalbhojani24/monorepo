import React, { useContext, useEffect, useRef, useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Combobox } from '@headlessui/react';
import * as Popover from '@radix-ui/react-popover';

import { ComboboxContextData } from '../../shared/comboboxContext';
import { func, string } from '../../shared/proptypesConstants';
import { ChevronUpDownIcon } from '../Icon';

import { renderMultiOptions, renderSingleOptions } from './helper';

const ComboboxTrigger = ({ onInputValueChange, placeholder }) => {
  const buttonRef = useRef();
  const comboInputRef = useRef();
  const { isMulti, setWidth, errorText, value } =
    useContext(ComboboxContextData);

  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    setWidth(buttonRef.current.offsetWidth);
  }, [setWidth]);

  useEffect(() => {
    if (comboInputRef.current) {
      setIsTruncated(
        comboInputRef.current.offsetWidth < comboInputRef.current.scrollWidth
      );
    }
  }, [value]);

  return (
    <Popover.Trigger asChild ref={buttonRef}>
      <div className="relative">
        <Combobox.Input
          placeholder={placeholder}
          className={twClassNames(
            'border-base-300 focus:border-brand-500 focus:ring-brand-500 w-full rounded-md border bg-white py-2 pl-3 pr-16 shadow-sm focus:outline-none focus:ring-1 sm:text-sm text-ellipsis',
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
            <>
              {isMulti && buttonValue?.length && isTruncated ? (
                <span className="mr-1 font-bold">{`(${buttonValue?.length})`}</span>
              ) : null}
              <ChevronUpDownIcon
                className="text-base-400 h-5 w-5"
                aria-hidden="true"
              />
            </>
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
