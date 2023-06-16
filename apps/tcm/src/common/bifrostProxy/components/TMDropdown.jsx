/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Dropdown,
  DropdownOptionGroup,
  DropdownOptionItem,
  DropdownTrigger,
  EllipsisVerticalIcon
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const TMDropdown = ({
  options,
  triggerVariant,
  triggerClassName,
  wrapperClassName,
  optionGroupWrapperClassName,
  triggerIcon,
  onClick
}) => (
  <Dropdown onClick={onClick} wrapperClassName={wrapperClassName}>
    <div className="flex">
      <DropdownTrigger
        wrapperClassName={twClassNames(
          'p-0 border-0 shadow-none bg-transparent',
          {
            'border-base-300 border p-2': triggerVariant === 'menu-button'
          },
          triggerClassName
        )}
      >
        {triggerIcon || (
          <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
        )}
      </DropdownTrigger>
    </div>

    <DropdownOptionGroup wrapperClassName={optionGroupWrapperClassName}>
      {options.map((opt) => (
        <DropdownOptionItem
          key={opt.value}
          option={opt}
          wrapperClassName="border-b last:border-b-0 border-base-200"
        />
      ))}
    </DropdownOptionGroup>
  </Dropdown>

  // <Dropdown
  //   {...props}
  //   trigger={
  //     <DropdownTriggerWIcon
  //       variant={triggerVariant}
  //       wrapperClassName={twClassNames(
  //         {
  //           'border-base-300 border': triggerVariant === 'menu-button'
  //         },
  //         triggerClassName
  //       )}
  //       icon={triggerIcon}
  //     />
  //   }
  //   wrapperClassName="flex"
  // />
);

TMDropdown.propTypes = {
  triggerVariant: PropTypes.string,
  optionGroupWrapperClassName: PropTypes.string,
  wrapperClassName: PropTypes.string,
  triggerIcon: PropTypes.node
};

TMDropdown.defaultProps = {
  triggerVariant: '',
  optionGroupWrapperClassName: '',
  wrapperClassName: '',
  triggerIcon: null
};

export default TMDropdown;
