import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { ChevronDownIcon, EllipsisVerticalIcon } from '../Icon';

import { DROPDOWN_TYPES } from './const/dropdownConstants';

import './styles.scss';

const Dropdown = (props) => {
  const {
    options,
    dividerRequired,
    triggerTitle,
    triggerVariant,
    headerRequired,
    heading,
    subHeading,
  } = props;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        {triggerVariant === 'text-button' && (
          <Menu.Button className="inline-flex w-full justify-center rounded-md border border-base-300 bg-white px-4 py-2 text-sm font-medium text-base-700 shadow-sm hover:bg-base-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-base-100">
            {triggerTitle}
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </Menu.Button>
        )}
        {['meatball-button', 'menu-button'].includes(triggerVariant) && (
          <Menu.Button
            className={classNames(
              'flex items-center rounded-full bg-base-100 text-base-400 hover:text-base-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-base-100',
              {
                'border-gray rounded-lg border border-2 bg-white p-2':
                  triggerVariant === DROPDOWN_TYPES[2],
              },
            )}
          >
            <span className="sr-only">Open options</span>
            <EllipsisVerticalIcon
              className={classNames('h-5 w-5', {
                'text-base-700': triggerVariant === DROPDOWN_TYPES[2],
              })}
              aria-hidden="true"
            />
          </Menu.Button>
        )}
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="divide-base-100 absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {headerRequired && (
            <div className="px-4 py-3">
              <p className="text-sm">{heading}</p>
              <p className="text-base-900 truncate text-sm font-medium">
                {subHeading}
              </p>
            </div>
          )}
          <div className="py-1">
            {options.map((option, optionIdx) => (
              <Menu.Item key={`${option.name}-${option.id}`}>
                {({ active }) => (
                  <a
                    href={option.url}
                    className={classNames(
                      {
                        'bg-base-100 text-base-900': active,
                        'text-base-700': !active,
                        'border-b border-base-100':
                          dividerRequired && optionIdx !== options.length - 1,
                      },
                      'block px-4 py-2 text-sm',
                    )}
                  >
                    {option.name}
                  </a>
                )}
              </Menu.Item>
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
      name: PropTypes.string,
      url: PropTypes.string,
    }),
  ).isRequired,
  dividerRequired: PropTypes.bool,
  triggerVariant: PropTypes.oneOf(DROPDOWN_TYPES),
  headerRequired: PropTypes.bool,
  heading: PropTypes.string,
  subHeading: PropTypes.string,
};
Dropdown.defaultProps = {
  triggerTitle: 'Options',
  options: [
    { id: '1', name: 'Edit', url: 'www.google.com' },
    { id: '2', name: 'Duplicate', url: 'www.google.com' },
    { id: '3', name: 'Archive', url: 'www.google.com' },
    { id: '4', name: 'Move', url: 'www.google.com' },
    { id: '5', name: 'Share', url: 'www.google.com' },
    { id: '6', name: 'Add to favorites', url: 'www.google.com' },
    { id: '7', name: 'Delete', url: 'www.google.com' },
  ],
  divider: false,
  triggerVariant: DROPDOWN_TYPES[0],
  headerRequired: false,
  heading: 'Signed in as',
  subHeading: 'tom@example.com',
};

export default Dropdown;
