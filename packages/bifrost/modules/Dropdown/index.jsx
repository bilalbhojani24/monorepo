import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import PropTypes from 'prop-types';

import { DROPDOWN_TYPES } from './const/dropdownConstants';
import DropdownItem from './DropdownItem';
import DropdownTrigger from './DropdownTrigger';

import './styles.scss';

const Dropdown = (props) => {
  const {
    options,
    triggerTitle,
    triggerVariant,
    headerRequired,
    heading,
    subHeading,
  } = props;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <DropdownTrigger
        triggerTitle={triggerTitle}
        triggerVariant={triggerVariant}
      />

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-base-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {headerRequired && (
            <div className="px-4 py-3">
              <p className="text-sm">{heading}</p>
              <p className="truncate text-sm font-medium text-base-900">
                {subHeading}
              </p>
            </div>
          )}
          <div className="py-1">
            {options.map((option, optionIdx) => (
              <DropdownItem
                onClick={option.onClick}
                key={`${option.body}-${option.id}`}
                index={optionIdx}
                option={option}
              />
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

Dropdown.propTypes = {
  triggerTitle: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      body: PropTypes.node,
      callback: PropTypes.func,
      divider: PropTypes.bool,
    }),
  ),
  triggerVariant: PropTypes.oneOf(DROPDOWN_TYPES),
  headerRequired: PropTypes.bool,
  heading: PropTypes.string,
  subHeading: PropTypes.string,
};
Dropdown.defaultProps = {
  triggerTitle: 'Options',
  options: [
    {
      id: '1',
      body: 'Edit',
      callback: () => {},
    },
    {
      id: '2',
      body: 'Duplicate',
      callback: () => {},
      divider: false,
    },
    {
      id: '3',
      body: 'Archive',
      callback: () => {},
      divider: true,
    },
  ],
  triggerVariant: DROPDOWN_TYPES[0],
  headerRequired: false,
  heading: 'Signed in as',
  subHeading: 'tom@example.com',
};

export default Dropdown;
