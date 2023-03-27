import React, { forwardRef, Fragment, useContext } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Listbox, Transition } from '@headlessui/react';
import * as Popover from '@radix-ui/react-popover';

import { node, oneOf, string } from '../../shared/proptypesConstants';
import { SelectMenuContextData } from '../../shared/selectMenuContext';

import { OPTION_GROUP_ALIGNMENT } from './const/selectMenuOptionGroupConstants';

const SelectMenuOptionGroup = forwardRef(
  ({ alignment, children, wrapperClassName, maxWidth }, ref) => {
    const { width } = useContext(SelectMenuContextData);

    return (
      <Popover.Portal>
        <Popover.Content
          asChild
          style={{
            minWidth: `${width}px`,
            maxWidth
          }}
          align={alignment}
        >
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              static
              className={twClassNames(
                'border-base-200 z-50 my-1 max-h-60 w-full overflow-scroll rounded-md border bg-white shadow-lg outline-none',
                wrapperClassName
              )}
              ref={ref}
            >
              {children}
            </Listbox.Options>
          </Transition>
        </Popover.Content>
      </Popover.Portal>
    );
  }
);

SelectMenuOptionGroup.propTypes = {
  alignment: oneOf(OPTION_GROUP_ALIGNMENT),
  children: node.isRequired,
  wrapperClassName: string,
  maxWidth: string
};

SelectMenuOptionGroup.defaultProps = {
  alignment: OPTION_GROUP_ALIGNMENT[0],
  wrapperClassName: '',
  maxWidth: '80vw'
};

export default SelectMenuOptionGroup;
