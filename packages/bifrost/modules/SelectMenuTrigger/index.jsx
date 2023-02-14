import React, { useCallback, useContext, useLayoutEffect, useRef } from 'react';
import { Listbox } from '@headlessui/react';
import * as Popover from '@radix-ui/react-popover';

import { string } from '../../shared/proptypesConstants';
import { SelectMenuContextData } from '../../shared/selectMenuContext';
import { ChevronUpDownIcon } from '../Icon';

import { renderMultiOptions, renderSingleOptions } from './helper';

import './styles.scss';

const SelectMenuTrigger = ({ placeholder }) => {
  const buttonRef = useRef();
  const { isMulti, setWidth } = useContext(SelectMenuContextData);

  const memoizedSetWidthCb = useCallback(() => {
    setWidth(buttonRef.current.offsetWidth);
  }, [setWidth]);

  useLayoutEffect(() => {
    memoizedSetWidthCb();
  }, [memoizedSetWidthCb]);

  return (
    <Popover.Trigger asChild>
      <Listbox.Button
        ref={buttonRef}
        className="border-base-300 focus:ring-brand-500 focus:border-brand-500 relative w-full cursor-default rounded-md border bg-white py-2 pl-3 pr-16 text-left shadow-sm focus:ring-1 sm:text-sm"
      >
        {({ value: btnValue }) => (
          <>
            <span className="flex items-center truncate">
              {isMulti && Array.isArray(btnValue)
                ? renderMultiOptions(btnValue, placeholder)
                : renderSingleOptions(btnValue, placeholder)}
            </span>

            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              {isMulti && btnValue?.length ? (
                <span className="mr-1 font-bold">{`(${btnValue.length})`}</span>
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
