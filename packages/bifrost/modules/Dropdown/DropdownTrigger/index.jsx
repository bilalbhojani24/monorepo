import React from 'react';
import { Menu } from '@headlessui/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { ChevronDownIcon, EllipsisVerticalIcon } from '../../Icon';
import { DROPDOWN_TYPES } from '../const/dropdownConstants';

const DropdownTrigger = ({ triggerVariant, triggerTitle }) => (
  <div>
    {triggerVariant === DROPDOWN_TYPES[0] ? (
      <Menu.Button className="border-base-300 text-base-700 hover:bg-base-50 focus:ring-brand-500 focus:ring-offset-base-100 inline-flex w-full justify-center rounded-md border bg-white px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2">
        {triggerTitle}
        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </Menu.Button>
    ) : (
      <Menu.Button
        className={classNames(
          'flex items-center rounded-full bg-base-100 text-base-400 hover:text-base-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-base-100',
          {
            'border-gray rounded-lg border border-2 bg-white p-2':
              triggerVariant === DROPDOWN_TYPES[2]
          }
        )}
      >
        <span className="sr-only">Open options</span>
        <EllipsisVerticalIcon
          className={classNames('h-5 w-5', {
            'text-base-700': triggerVariant === DROPDOWN_TYPES[2]
          })}
          aria-hidden="true"
        />
      </Menu.Button>
    )}
  </div>
);

DropdownTrigger.propTypes = {
  triggerTitle: PropTypes.string,
  triggerVariant: PropTypes.oneOf(DROPDOWN_TYPES)
};
DropdownTrigger.defaultProps = {
  triggerVariant: DROPDOWN_TYPES[0],
  triggerTitle: 'Options'
};

export default DropdownTrigger;
