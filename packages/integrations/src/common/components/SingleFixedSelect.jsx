import React from 'react';
import {
  SelectMenu,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import Label from './Label';

const SingleValueSelect = ({
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
    <SelectMenu onChange={handleChange} value={value}>
      <Label label={label} required={required} />
      <SelectMenuTrigger
        placeholder={placeholder}
        wrapperClassName={wrapperClassName}
      />
      <SelectMenuOptionGroup>
        {options.map((item) => (
          <SelectMenuOptionItem
            key={item.value}
            option={item}
            wrapperClassName="text-base-500"
          />
        ))}
      </SelectMenuOptionGroup>
    </SelectMenu>
  );
};

SingleValueSelect.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(),
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  wrapperClassName: PropTypes.string
};

SingleValueSelect.defaultProps = {
  value: '',
  placeholder: null,
  options: [],
  required: false,
  wrapperClassName: ''
};

export default SingleValueSelect;
