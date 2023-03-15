import React, { useMemo } from 'react';
import {
  ComboBox,
  ComboboxOptionGroup,
  ComboboxOptionItem,
  ComboboxTrigger
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import Label from './Label';

const MultiSelect = ({
  fieldKey,
  fieldsData,
  setFieldsData,
  placeholder,
  options,
  label,
  required,
  wrapperClassName
}) => {
  const cleanedOptions = useMemo(
    () =>
      options.map((option) => ({
        label: option.label,
        value: option.key
      })),
    [options]
  );

  const handleChange = (val) => {
    setFieldsData({ ...fieldsData, [fieldKey]: val });
  };

  return (
    <>
      <ComboBox onChange={handleChange} value={fieldsData[fieldKey]} isMulti>
        <Label label={label} required={required} />
        <ComboboxTrigger
          placeholder={placeholder}
          wrapperClassName={wrapperClassName}
        />
        <ComboboxOptionGroup>
          {cleanedOptions.map((item) => (
            <ComboboxOptionItem
              key={item.value}
              option={item}
              wrapperClassName="text-base-500"
            />
          ))}
        </ComboboxOptionGroup>
      </ComboBox>
    </>
  );
};

MultiSelect.propTypes = {
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(),
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  wrapperClassName: PropTypes.string
};

MultiSelect.defaultProps = {
  placeholder: null,
  options: [],
  required: false,
  wrapperClassName: ''
};

export default MultiSelect;
