import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
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
    headerVisible,
    heading,
    subHeading,
    onClick
  } = props;

  const handleClick = (e) => {
    e.preventDefault();
    onClick(e);
  };

  return (
    <DropdownMenu.Root>
      <DropdownTrigger
        triggerTitle={triggerTitle}
        triggerVariant={triggerVariant}
      />

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
              <DropdownItem
                key={`${option.body}-${option.id}`}
                index={optionIdx}
                option={option}
                callback={handleClick}
              />
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
