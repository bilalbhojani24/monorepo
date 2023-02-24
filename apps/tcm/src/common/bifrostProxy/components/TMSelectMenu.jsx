/* eslint-disable tailwindcss/no-arbitrary-value */
import React from 'react';
import {
  SelectMenu,
  SelectMenuLabel,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

const TMSelectMenu = ({
  placeholder,
  dividerIdx,
  label,
  options,
  onChange,
  value,
  isMulti,
  defaultValue,
  triggerWrapperClassName
}) => (
  <SelectMenu
    onChange={onChange}
    value={value}
    isMulti={isMulti}
    defaultValue={defaultValue}
  >
    {label && <SelectMenuLabel>{label}</SelectMenuLabel>}
    <SelectMenuTrigger
      placeholder={placeholder}
      wrapperClassName={triggerWrapperClassName}
    />
    <SelectMenuOptionGroup>
      {React.Children.toArray(
        options.map((item, idx) => (
          <SelectMenuOptionItem
            option={item}
            wrapperClassName={
              idx === dividerIdx ? 'border-base-100 border-b' : ''
            }
          />
        ))
      )}
    </SelectMenuOptionGroup>
  </SelectMenu>
);

TMSelectMenu.propTypes = {
  placeholder: PropTypes.string,
  isMulti: PropTypes.bool,
  label: PropTypes.string,
  dividerIdx: PropTypes.number,
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
  })
};

TMSelectMenu.defaultProps = {
  isMulti: false,
  placeholder: '',
  dividerIdx: null,
  label: '',
  options: [],
  onChange: () => {},
  value: null,
  defaultValue: null
};
export default TMSelectMenu;
