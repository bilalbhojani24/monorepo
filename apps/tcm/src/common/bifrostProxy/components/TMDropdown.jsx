/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { Dropdown, DropdownTriggerWIcon } from '@browserstack/bifrost';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const TMDropdown = (props) => {
  const { triggerVariant, triggerClassName } = props;

  return (
    <Dropdown
      {...props}
      trigger={
        <DropdownTriggerWIcon
          variant={triggerVariant}
          wrapperClassName={classNames(triggerClassName, {
            'border-base-300 border': triggerVariant === 'menu-button'
          })}
        />
      }
      wrapperClassName="flex"
    />
  );
};

TMDropdown.propTypes = {
  triggerVariant: PropTypes.string
};

TMDropdown.defaultProps = {
  triggerVariant: ''
};

export default TMDropdown;
