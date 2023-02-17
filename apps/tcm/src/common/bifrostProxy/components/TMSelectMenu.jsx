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
  label,
  options,
  onChange,
  value,
  isMulti,
  defaultValue
}) => (
  <SelectMenu
    onChange={onChange}
    value={value}
    isMulti={isMulti}
    defaultValue={defaultValue}
  >
    {label && <SelectMenuLabel>{label}</SelectMenuLabel>}
    <SelectMenuTrigger placeholder={placeholder} />
    <SelectMenuOptionGroup>
      {React.Children.toArray(
        options.map((item) => <SelectMenuOptionItem option={item} />)
      )}
    </SelectMenuOptionGroup>
  </SelectMenu>
);

TMSelectMenu.propTypes = {
  placeholder: PropTypes.string,
  isMulti: PropTypes.bool,
  label: PropTypes.string,
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
  label: '',
  options: [],
  onChange: () => {},
  value: null,
  defaultValue: null
};
export default TMSelectMenu;
