import React, { useContext, useEffect, useRef } from 'react';
import { Listbox } from '@headlessui/react';
import * as Popover from '@radix-ui/react-popover';

import { string } from '../../shared/proptypesConstants';
import { SelectMenuContextData } from '../../shared/selectMenuContext';
import { ChevronUpDownIcon } from '../Icon';

import { renderMultiOptions, renderSingleOptions } from './helper';

const SelectMenuTrigger = ({ placeholder }) => {
  const buttonRef = useRef();
  const { isMulti, setWidth } = useContext(SelectMenuContextData);

  useEffect(() => {
    setWidth(buttonRef.current.offsetWidth);
  }, [setWidth]);

  return (
    <Popover.Trigger asChild>
      <Listbox.Button
        ref={buttonRef}
        className="border-base-300 focus:ring-brand-500 focus:border-brand-500 relative w-full cursor-default rounded-md border bg-white py-2 pl-3 pr-16 text-left shadow-sm focus:ring-1 sm:text-sm"
      >
        {({ value }) => (
          <>
            <span className="flex items-center truncate">
              {isMulti && Array.isArray(value)
                ? renderMultiOptions(value, placeholder)
                : renderSingleOptions(value, placeholder)}
            </span>

            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              {isMulti && value?.length ? (
                <span className="mr-1 font-bold">{`(${value.length})`}</span>
              ) : null}
              <ChevronUpDownIcon
                className="text-base-400 h-5 w-5"
                aria-hidden="true"
              />
            </span>
          </>
        )}
      </Listbox.Button>
    </Popover.Trigger>
  );
};

SelectMenuTrigger.propTypes = {
  placeholder: string
};
SelectMenuTrigger.defaultProps = {
  placeholder: ''
};

export default SelectMenuTrigger;
