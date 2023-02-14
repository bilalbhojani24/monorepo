import React, { Fragment, useContext } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Listbox, Transition } from '@headlessui/react';
import * as Popover from '@radix-ui/react-popover';

import { node, string } from '../../shared/proptypesConstants';
import { SelectMenuContextData } from '../../shared/selectMenuContext';

import './styles.scss';

const SelectMenuOptionsBox = ({ children, wrapperClassName }) => {
  const { width } = useContext(SelectMenuContextData);

  return (
    <Popover.Portal forceMount>
      <Popover.Content
        asChild
        style={{
          width: `${width}px`
        }}
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
              'divide-base-100 border-base-200 z-50 my-1 max-h-60 w-full divide-y overflow-scroll rounded-md border bg-white shadow-lg outline-none',
              wrapperClassName
            )}
          >
            {children}
          </Listbox.Options>
        </Transition>
      </Popover.Content>
    </Popover.Portal>
  );
};

SelectMenuOptionsBox.propTypes = {
  children: node.isRequired,
  wrapperClassName: string
};
SelectMenuOptionsBox.defaultProps = {
  wrapperClassName: ''
};

export default SelectMenuOptionsBox;
