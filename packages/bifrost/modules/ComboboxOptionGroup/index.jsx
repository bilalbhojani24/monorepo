import React, { Fragment, useContext } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Combobox, Transition } from '@headlessui/react';
import * as Popover from '@radix-ui/react-popover';

import { ComboboxContextData } from '../../shared/comboboxContext';
import { node, string } from '../../shared/proptypesConstants';

const ComboboxOptionGroup = ({ children, wrapperClassName }) => {
  const { width } = useContext(ComboboxContextData);
  return (
    <Popover.Portal>
      <Popover.Content
        asChild
        style={{
          width: `${width}px`
        }}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Combobox.Options
            static
            className={twClassNames(
              'border-base-200 z-50 my-1 max-h-60 w-full overflow-scroll rounded-md border bg-white shadow-lg outline-none',
              wrapperClassName
            )}
          >
            {children}
          </Combobox.Options>
        </Transition>
      </Popover.Content>
    </Popover.Portal>
  );
};

ComboboxOptionGroup.propTypes = {
  children: node.isRequired,
  wrapperClassName: string
};

ComboboxOptionGroup.defaultProps = {
  wrapperClassName: ''
};

export default ComboboxOptionGroup;
