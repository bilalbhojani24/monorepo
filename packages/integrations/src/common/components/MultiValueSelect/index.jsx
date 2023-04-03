import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  ComboBox,
  ComboboxOptionGroup,
  ComboboxOptionItem,
  ComboboxTrigger
} from '@browserstack/bifrost';
import { makeDebounce } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { fetchOptionsThunk } from '../../../api';
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
  const dispatch = useDispatch();
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
    // do we have optionsTwo?
    if (optionsTwo) {
      // consolidate the arrays into one and store it in res
      res = optionsTwo.reduce(
        // accumulator or the resultantArray, currentOption from optionOne
        (acc, curr) => {
          // is the current option from optionsTwo array present in the accumulator
          // which was initialised by the optionsOne array?
          const isInOptionsOne =
            acc.findIndex((optionOne) => optionOne?.key === curr?.key) !== -1;
          // It is not present, so we must push it
          if (!isInOptionsOne) {
            acc.push(curr);
          }
          return acc;
        },
        [...(optionsOne ?? [])] // initialise the resultant array with optionsOne array
      );
    } else {
      // we don't have optionsTwo array, then optionsOne is the default result
      res = optionsOne;
    }
    return res;
  };

  useEffect(() => {
    if (optionsPath) {
      dispatch(
        fetchOptionsThunk({ path: optionsPath, isDefaultOptions: true })
      ).then(({ payload: optionsData = [] }) => {
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
    dispatch(
      fetchOptionsThunk({ path: searchPath + query, isDefaultOptions: false })
    ).then(({ payload: optionsData = [] }) => {
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

  console.log(optionsToRender);
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
          {optionsToRender?.map((item) => (
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
