/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { Dropdown, DropdownTriggerWIcon } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const TMDropdown = (props) => {
  const { triggerVariant, triggerClassName, triggerIcon } = props;

  return (
    <Dropdown
      {...props}
      trigger={
        <DropdownTriggerWIcon
          variant={triggerVariant}
          wrapperClassName={twClassNames(
            {
              'border-base-300 border': triggerVariant === 'menu-button'
            },
            triggerClassName
          )}
          icon={triggerIcon}
        />
      }
      wrapperClassName="flex"
    />
  );
};

TMDropdown.propTypes = {
  triggerVariant: PropTypes.string,
  triggerIcon: PropTypes.node
};

TMDropdown.defaultProps = {
  triggerVariant: '',
  triggerIcon: null
};

export default TMDropdown;
