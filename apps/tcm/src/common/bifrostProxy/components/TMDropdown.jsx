/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Dropdown, DropdownTriggerWIcon } from '@browserstack/bifrost';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const TMDropdown = (props) => {
  const { triggerVariant } = props;

  return (
    <Dropdown
      {...props}
      trigger={
        <DropdownTriggerWIcon
          variant={triggerVariant}
          wrapperClassName={classNames({
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
