/* eslint-disable tailwindcss/no-arbitrary-value */
import React, { forwardRef } from 'react';
import {
  SelectMenu,
  SelectMenuLabel,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const TMSelectMenu = forwardRef(
  (
    {
      placeholder,
      label,
      options,
      onChange,
      value,
      isMulti,
      defaultValue,
      triggerWrapperClassName,
      checkPosition,
      onOpenChange,
      disabled
    },
    ref
  ) => (
    <SelectMenu
      onChange={onChange}
      value={value}
      isMulti={isMulti}
      defaultValue={defaultValue}
      onOpenChange={onOpenChange}
      disabled={disabled}
    >
      {label && <SelectMenuLabel>{label}</SelectMenuLabel>}
      <SelectMenuTrigger
        ref={ref}
        placeholder={placeholder}
        wrapperClassName={twClassNames(
          'cursor-pointer',
          triggerWrapperClassName
        )}
      />
      {options.length ? (
        <SelectMenuOptionGroup>
          {React.Children.toArray(
            options.map((item) => (
              <SelectMenuOptionItem
                checkPosition={checkPosition}
                option={item}
                wrapperClassName={
                  item.divider ? 'border-base-100 border-b' : ''
                }
              />
            ))
          )}
        </SelectMenuOptionGroup>
      ) : null}
    </SelectMenu>
  )
);

TMSelectMenu.propTypes = {
  placeholder: PropTypes.string,
  isMulti: PropTypes.bool,
  label: PropTypes.string,
  checkPosition: PropTypes.string,
  triggerWrapperClassName: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
      image: PropTypes.string
    })
  ),
  onChange: PropTypes.func,
  value: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
    image: PropTypes.string
  }),
  defaultValue: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
    image: PropTypes.string
  }),
  onOpenChange: PropTypes.func,
  disabled: PropTypes.bool
};

TMSelectMenu.defaultProps = {
  isMulti: false,
  placeholder: '',
  label: '',
  checkPosition: 'left',
  triggerWrapperClassName: '',
  options: [],
  onChange: () => {},
  value: null,
  defaultValue: null,
  onOpenChange: () => {},
  disabled: false
};
export default TMSelectMenu;
