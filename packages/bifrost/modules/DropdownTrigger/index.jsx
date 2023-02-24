import React from 'react';
import { twClassNames } from '@browserstack/utils';
import { Menu } from '@headlessui/react';
import * as Popover from '@radix-ui/react-popover';
import PropTypes from 'prop-types';

const DropdownTrigger = ({ children, onClick, wrapperClassName }) => (
  <Popover.Trigger asChild>
    <Menu.Button
      className={twClassNames(
        'border-base-300 text-base-700 hover:bg-base-50 focus:ring-offset-base-100 focus:ring-brand-500 inline-flex w-full justify-center rounded-md border bg-white px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2',
        wrapperClassName
      )}
      onClick={(e) => onClick?.(e)}
    >
      {children}
    </Menu.Button>
  </Popover.Trigger>
);

DropdownTrigger.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  wrapperClassName: PropTypes.string
};

DropdownTrigger.defaultProps = {
  onClick: null,
  wrapperClassName: ''
};

export default DropdownTrigger;
