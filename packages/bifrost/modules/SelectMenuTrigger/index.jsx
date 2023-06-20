import React, { forwardRef, useContext, useEffect, useRef } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Listbox } from '@headlessui/react';
import * as Popover from '@radix-ui/react-popover';

import { node, string } from '../../shared/proptypesConstants';
import { SelectMenuContextData } from '../../shared/selectMenuContext';
import { ChevronUpDownIcon } from '../Icon';
import TruncateText from '../TruncateText';

import RenderButtonChildren from './components/RenderButtonChildren';

const SelectMenuTrigger = forwardRef(
  ({ placeholder, wrapperClassName, triggerIcon }, ref) => {
    const buttonRef = useRef();
    const appliedRef = ref || buttonRef;
    const { isMulti, setWidth, showCount, errorText, disabled, open } =
      useContext(SelectMenuContextData);

    useEffect(() => {
      if (open) setWidth(appliedRef.current.offsetWidth);
    }, [setWidth, appliedRef, open]);

    return (
      <Popover.Trigger asChild>
        <Listbox.Button
          ref={appliedRef}
          className={twClassNames(
            'border-base-300 focus:ring-brand-500 focus:border-brand-500 relative w-full rounded-md border bg-white py-2 pl-3 pr-7 text-left shadow-sm focus:ring-1 sm:text-sm cursor-pointer text-sm leading-6',
            {
              'border-danger-300': errorText,
              'pr-14': isMulti && showCount,
              'cursor-not-allowed border-base-200 bg-base-50 text-base-500':
                disabled
            },
            wrapperClassName
          )}
        >
          {({ value }) => (
            <>
              <span className="line-clamp-1">
                <TruncateText hidetooltipTriggerIcon isTooltip={false}>
                  <RenderButtonChildren
                    value={value}
                    placeholder={placeholder}
                  />
                </TruncateText>
              </span>

              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                {isMulti && value?.length && showCount ? (
                  <span className="mr-1 font-bold">{`(${value.length})`}</span>
                ) : null}
                {triggerIcon}
              </span>
            </>
          )}
        </Listbox.Button>
      </Popover.Trigger>
    );
  }
);

SelectMenuTrigger.propTypes = {
  placeholder: string,
  wrapperClassName: string,
  triggerIcon: node
};
SelectMenuTrigger.defaultProps = {
  placeholder: '',
  wrapperClassName: '',
  triggerIcon: (
    <ChevronUpDownIcon className="text-base-400 h-5 w-5" aria-hidden="true" />
  )
};

export default SelectMenuTrigger;
