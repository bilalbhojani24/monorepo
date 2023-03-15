import React, { useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import {
  ComboBox,
  ComboboxLabel,
  ComboboxOptionGroup,
  ComboboxOptionItem,
  ComboboxTrigger
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

const O11yComboBox = ({
  isMulti,
  placeholder,
  label,
  options,
  onChange,
  value,
  checkPosition
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
        <Virtuoso
          style={{ height: 238 }}
          data={filteredOptions || []}
          overscan={50}
          itemContent={(_, item) => (
            <ComboboxOptionItem
              option={item}
              checkPosition={checkPosition}
              wrapperClassName="text-sm"
            />
          )}
        />
      </ComboboxOptionGroup>
    </ComboBox>
  );
};

O11yComboBox.propTypes = {
  isMulti: PropTypes.bool,
  placeholder: PropTypes.string,
  checkPosition: PropTypes.string,
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

O11yComboBox.defaultProps = {
  isMulti: false,
  placeholder: '',
  checkPosition: '',
  label: '',
  options: [],
  onChange: () => {},
  value: null
};
export default O11yComboBox;
