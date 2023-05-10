/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {
  Dropdown,
  DropdownOptionGroup,
  DropdownOptionItem,
  DropdownTrigger,
  EllipsisVerticalIcon
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

const O11yDropdown = ({ dropdownProps, options, dropdownTriggerProps }) => (
  <Dropdown {...dropdownProps}>
    <div className="flex">
      <DropdownTrigger
        wrapperClassName="p-0 border-0 shadow-none"
        {...dropdownTriggerProps}
      >
        <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
      </DropdownTrigger>
    </div>

    <DropdownOptionGroup>
      {options.map((opt) => (
        <DropdownOptionItem key={opt.value} option={opt} />
      ))}
    </DropdownOptionGroup>
  </Dropdown>
);

export default O11yDropdown;

O11yDropdown.propTypes = {
  dropdownProps: PropTypes.any,
  options: PropTypes.array.isRequired,
  dropdownTriggerProps: PropTypes.any
};

O11yDropdown.defaultProps = {
  dropdownProps: {},
  dropdownTriggerProps: {}
};
