import React, { Fragment, useContext } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Menu, Transition } from '@headlessui/react';
import * as Popover from '@radix-ui/react-popover';
import PropTypes from 'prop-types';

import { DropdownContextData } from '../../shared/dropdownContext';

const DropdownOptionGroup = ({ children, wrapperClassName }) => {
  const { align, side } = useContext(DropdownContextData);

  return (
    <Popover.Portal>
      <Popover.Content asChild side={side} align={align}>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            static
            className={twClassNames(
              'border-base-200 my-1 w-56 z-50 rounded-md border bg-white shadow-lg outline-none ring-1 ring-black ring-opacity-5 focus:outline-none',
              wrapperClassName
            )}
          >
            {children}
          </Menu.Items>
        </Transition>
      </Popover.Content>
    </Popover.Portal>
  );
};

DropdownOptionGroup.propTypes = {
  children: PropTypes.node.isRequired,
  wrapperClassName: PropTypes.string
};
DropdownOptionGroup.defaultProps = {
  wrapperClassName: ''
};

export default DropdownOptionGroup;
