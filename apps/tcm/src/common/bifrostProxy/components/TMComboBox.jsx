/* eslint-disable tailwindcss/no-arbitrary-value */
import React, { useState } from 'react';
import {
  ComboBox,
  ComboboxLabel,
  ComboboxOptionGroup,
  ComboboxOptionItem,
  ComboboxTrigger
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

const TMComboBox = ({
  isMulti,
  placeholder,
  label,
  options,
  onChange,
  value
}) => {
  const [query, setQuery] = useState('');

  const filteredOptions =
    query === ''
      ? options
      : options.filter((opt) =>
          opt.label.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <ComboBox onChange={onChange} value={value} isMulti={isMulti}>
      {label && <ComboboxLabel>{label}</ComboboxLabel>}
      <ComboboxTrigger
        placeholder={placeholder}
        onInputValueChange={(e) => setQuery(e.target.value)}
      />
      <ComboboxOptionGroup>
        {React.Children.toArray(
          filteredOptions.map((item) => <ComboboxOptionItem option={item} />)
        )}
      </ComboboxOptionGroup>
    </ComboBox>
  );
};

TMComboBox.propTypes = {
  isMulti: PropTypes.bool,
  placeholder: PropTypes.string,
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
  })
};

TMComboBox.defaultProps = {
  isMulti: false,
  placeholder: '',
  label: '',
  options: [],
  onChange: () => {},
  value: null
};
export default TMComboBox;
