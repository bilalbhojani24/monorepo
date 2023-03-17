import React, { useEffect, useMemo } from 'react';
import {
  // Loader,
  SelectMenu,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger
} from '@browserstack/bifrost';
import { usePrevious } from '@browserstack/hooks';
import PropTypes from 'prop-types';

import Label from './Label';

const SingleFixedSelect = ({
  label,
  options,
  required,
  fieldKey = '',
  fieldsData = {},
  setFieldsData,
  placeholder,
  wrapperClassName
}) => {
  const previousOptions = usePrevious(options);
  const cleanedOptions = useMemo(
    () =>
      options.map((option) => ({
        image: option.image || option.icon,
        label: option.label,
        value: option.value || option.id || option.key,
        ticketTypes: option.ticket_types
      })),
    [options]
  );

  useEffect(() => {
    if (
      (typeof setFieldsData === 'function' &&
        !fieldsData?.[fieldKey]?.length < 1) ||
      options !== previousOptions
    ) {
      setFieldsData({ ...fieldsData, [fieldKey]: cleanedOptions[0] });
    }
  }, [
    cleanedOptions,
    options,
    previousOptions,
    fieldKey,
    fieldsData,
    setFieldsData
  ]);

  const handleChange = (val) => {
    if (typeof setFieldsData === 'function') {
      setFieldsData({ ...fieldsData, [fieldKey]: val });
    }
  };

  return (
    <SelectMenu onChange={handleChange} value={fieldsData?.[fieldKey]}>
      <Label label={label} required={required} />
      <SelectMenuTrigger
        placeholder={placeholder}
        wrapperClassName={wrapperClassName}
      />
      <SelectMenuOptionGroup>
        {cleanedOptions.map((item) => (
          <SelectMenuOptionItem key={item.id} option={item} />
        ))}
      </SelectMenuOptionGroup>
    </SelectMenu>
  );
};

SingleFixedSelect.propTypes = {
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(),
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  wrapperClassName: PropTypes.string
};

SingleFixedSelect.defaultProps = {
  placeholder: null,
  options: [],
  required: false,
  wrapperClassName: ''
};

export default SingleFixedSelect;
