import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import PropTypes from 'prop-types';

import { twClassNames } from '../../utils/tailwindUtils';
import { ChevronDownIcon, EllipsisVerticalIcon } from '../Icon';

import { DROPDOWN_TYPES } from './const/dropdownConstants';

import './styles.scss';

const Dropdown = (props) => {
  const {
    options,
    triggerTitle,
    triggerVariant,
    headerVisible,
    heading,
    subHeading,
    onClick
  } = props;

  const handleClick = (e) => {
    onClick(e);
  };

  return (
    <DropdownMenu.Root>
      <div>
        {triggerVariant === DROPDOWN_TYPES[0] ? (
          <DropdownMenu.Trigger className="border-base-300 text-base-700 hover:bg-base-50 focus:ring-brand-500 focus:ring-offset-base-100 inline-flex w-full justify-center rounded-md border bg-white px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2">
            {triggerTitle}
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </DropdownMenu.Trigger>
        ) : (
          <DropdownMenu.Trigger
            className={twClassNames(
              'flex items-center rounded-full bg-base-100 text-base-400 hover:text-base-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-base-100',
              {
                'border-gray rounded-lg border border-2 bg-white p-2':
                  triggerVariant === DROPDOWN_TYPES[2]
              }
            )}
          >
            <span className="sr-only">Open options</span>
            <EllipsisVerticalIcon
              className={twClassNames('h-5 w-5', {
                'text-base-700': triggerVariant === DROPDOWN_TYPES[2]
              })}
              aria-hidden="true"
            />
          </DropdownMenu.Trigger>
        )}
      </div>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          className="divide-base-100 z-10 mt-2 w-56 origin-top-right divide-y rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
        >
          {headerVisible && (
            <div className="px-4 py-3">
              <p className="text-sm">{heading}</p>
              <p className="text-base-900 truncate text-sm font-medium">
                {subHeading}
              </p>
            </div>
          )}
          <div className="py-1">
            {options.map((option, optionIdx) => (
              <DropdownMenu.Item
                key={`${option.body}-${option.id}`}
                className={twClassNames(
                  'border-base-100 text-base-700 hover:bg-base-100 hover:text-base-900 focus:outline-none',
                  {
                    'border-t border-base-100':
                      option.divider === true && optionIdx !== 0
                  }
                )}
              >
                <button
                  onClick={handleClick}
                  type="button"
                  className="block w-full px-4 py-2 text-left text-sm"
                >
                  {option.body}
                </button>
              </DropdownMenu.Item>
            ))}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

Dropdown.propTypes = {
  triggerTitle: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      body: PropTypes.node,
      divider: PropTypes.bool
    })
  ),
  triggerVariant: PropTypes.oneOf(DROPDOWN_TYPES),
  headerVisible: PropTypes.bool,
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  onClick: PropTypes.func
};
Dropdown.defaultProps = {
  triggerTitle: 'Options',
  options: [],
  triggerVariant: DROPDOWN_TYPES[0],
  headerVisible: false,
  heading: '',
  subHeading: '',
  onClick: () => {}
};

export default Dropdown;
