import React from 'react';
import {
  ComboBox,
  ComboboxOptionGroup,
  ComboboxOptionItem,
  ComboboxTrigger
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import Label from './Label';

const SingleDynamicSelect = ({
  value,
  setValue,
  placeholder,
  options,
  label,
  required,
  wrapperClassName
}) => {
  const handleChange = (val) => {
    setValue(val);
  };
  if (options.length < 1) return null;

  return (
    <ComboBox onChange={handleChange} value={value}>
      <Label label={label} required={required} />
      <ComboboxTrigger
        placeholder={placeholder}
        wrapperClassName={wrapperClassName}
      />
      <ComboboxOptionGroup>
        {options.map((item) => (
          <ComboboxOptionItem
            key={item.value}
            option={item}
            wrapperClassName="text-base-500"
          />
        ))}
      </ComboboxOptionGroup>
    </ComboBox>
  );
};

SingleDynamicSelect.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(),
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  wrapperClassName: PropTypes.string
};

SingleDynamicSelect.defaultProps = {
  value: '',
  placeholder: null,
  options: [],
  required: false,
  wrapperClassName: ''
};

export default SingleDynamicSelect;
