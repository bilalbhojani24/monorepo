import React, { useCallback, useEffect, useState } from 'react';
import {
  ComboBox,
  ComboboxOptionGroup,
  ComboboxOptionItem,
  ComboboxTrigger
} from '@browserstack/bifrost';
import { makeDebounce } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { fetchOptions } from '../../../api';
import useRequiredFieldError from '../../hooks/useRequiredFieldError';
import Label from '../Label';

const MultiSelect = ({
  label,
  value,
  options,
  required,
  fieldKey,
  searchPath,
  fieldsData,
  fieldErrors,
  placeholder,
  optionsPath,
  defaultValue,
  setFieldsData,
  wrapperClassName,
  areSomeRequiredFieldsEmpty
}) => {
  const cleanOptions = (options) =>
    Array.isArray(options) &&
    options.map((option) => ({
      label: option.label,
      value: option.key
    }));

  const handleChange = (val) => {
    setFieldsData({ ...fieldsData, [fieldKey]: val });
  };

  const [optionsToRender, setOptionsToRender] = useState([]);
  const [dynamicOptions, setDynamicOptions] = useState(null);
  const requiredFieldError = useRequiredFieldError(
    required,
    fieldsData[fieldKey],
    areSomeRequiredFieldsEmpty
  );

  useEffect(() => {
    if (value || defaultValue) {
      const cleanedValue = cleanOptions(value || defaultValue);
      setFieldsData({ ...fieldsData, [fieldKey]: cleanedValue });
    }
  }, [value, defaultValue]);

  const mergeTwoOptionsArray = (optionsOne, optionsTwo) => {
    let res = [];
    if (optionsTwo) {
      res = optionsTwo.reduce(
        (acc, curr) => {
          const isInOptionsOne =
            acc.findIndex((optionOne) => optionOne?.key === curr?.key) !== -1;
          if (!isInOptionsOne) {
            acc.push(curr);
          }
          return acc;
        },
        [...(optionsOne ?? [])]
      );
    } else {
      res = optionsOne;
    }
    return res;
  };

  useEffect(() => {
    if (optionsPath) {
      fetchOptions(optionsPath).then((optionsData) => {
        const cleanedOptions = cleanOptions(
          mergeTwoOptionsArray(optionsData, value || defaultValue)
        );
        setOptionsToRender(cleanedOptions);
        setDynamicOptions(cleanedOptions);
      });
    }
  }, [optionsPath]);

  useEffect(() => {
    if (value || defaultValue) {
      const optionsWithValue = mergeTwoOptionsArray(
        options,
        value || defaultValue
      );
      setOptionsToRender(cleanOptions(optionsWithValue));
    } else setOptionsToRender(cleanOptions(options));
  }, [options, value, defaultValue]);

  const fetchQuery = (query) => {
    fetchOptions(searchPath + query).then((optionsData) => {
      const cleanedOptions = cleanOptions(optionsData);
      setOptionsToRender(cleanedOptions);
      setDynamicOptions(cleanedOptions);
    });
  };

  const searchInOptions = useCallback(
    (query) => {
      const cleanedOptions = optionsPath
        ? dynamicOptions
        : cleanOptions(options);
      const filtered = cleanedOptions?.filter(({ label: optionLabel }) =>
        optionLabel.toLowerCase().includes(query.toLowerCase())
      );
      setOptionsToRender(filtered);
    },
    [options, dynamicOptions, optionsPath]
  );

  const debouncedFetchQuery = useCallback(makeDebounce(fetchQuery, 300), []);

  const handleInputChange = (e) => {
    const queryArr = e.target.value?.trim().split(',');
    const query = queryArr[queryArr.length - 1];
    if (searchPath) {
      debouncedFetchQuery(query);
    }
    if (query) {
      searchInOptions(query);
    } else {
      setOptionsToRender(optionsPath ? dynamicOptions : cleanOptions(options));
    }
  };

  const valueToRender =
    fieldsData[fieldKey] || cleanOptions(value || defaultValue) || [];

  return (
    <div className="py-3">
      <ComboBox
        onChange={handleChange}
        value={valueToRender}
        isMulti
        errorText={requiredFieldError || fieldErrors?.[fieldKey]}
      >
        <Label label={label} required={required} />
        <ComboboxTrigger
          placeholder={placeholder}
          wrapperClassName={wrapperClassName}
          onInputValueChange={handleInputChange}
        />
        <ComboboxOptionGroup>
          {optionsToRender.map((item) => (
            <ComboboxOptionItem
              key={item.value}
              option={item}
              wrapperClassName="text-base-500"
            />
          ))}
        </ComboboxOptionGroup>
      </ComboBox>
    </div>
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
