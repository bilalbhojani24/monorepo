import React, { useContext, useEffect, useRef } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Listbox } from '@headlessui/react';
import * as Popover from '@radix-ui/react-popover';

import { string } from '../../shared/proptypesConstants';
import { SelectMenuContextData } from '../../shared/selectMenuContext';
import { ChevronUpDownIcon } from '../Icon';
import TruncateText from '../TruncateText';

import { renderMultiOptions, renderSingleOptions } from './helper';

const SelectMenuTrigger = ({ placeholder, wrapperClassName }) => {
  const buttonRef = useRef();
  const { isMulti, setWidth, showCount, setShowCount } = useContext(
    SelectMenuContextData
  );

  useEffect(() => {
    setWidth(buttonRef.current.offsetWidth);
  }, [setWidth]);

  const RenderButtonChildren = (props) => {
    // eslint-disable-next-line react/prop-types
    const { val, truncated } = props;
    useEffect(() => {
      setShowCount(truncated);
    }, [truncated]);

    return (
      <>
        {isMulti && Array.isArray(val)
          ? renderMultiOptions(val, placeholder)
          : renderSingleOptions(val, placeholder)}
      </>
    );
  };

  return (
    <Popover.Trigger asChild>
      <Listbox.Button
        ref={buttonRef}
        className={twClassNames(
          'border-base-300 focus:ring-brand-500 focus:border-brand-500 relative w-full cursor-default rounded-md border bg-white py-2 pl-3 pr-16 text-left shadow-sm focus:ring-1 sm:text-sm',
          wrapperClassName
        )}
      >
        {({ value }) => (
          <>
            <span className="line-clamp-1">
              <TruncateText hidetooltipTriggerIcon isTooltip={false}>
                <RenderButtonChildren val={value} />
              </TruncateText>
            </span>

            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              {isMulti && value?.length && showCount ? (
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
  placeholder: string,
  wrapperClassName: string
};
SelectMenuTrigger.defaultProps = {
  placeholder: '',
  wrapperClassName: ''
};

export default SelectMenuTrigger;
