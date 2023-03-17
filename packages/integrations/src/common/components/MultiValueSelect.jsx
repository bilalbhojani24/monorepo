import React, { useCallback, useEffect, useState } from 'react';
import {
  ComboBox,
  ComboboxOptionGroup,
  ComboboxOptionItem,
  ComboboxTrigger
} from '@browserstack/bifrost';
import { makeDebounce } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { fetchOptions } from '../../api';

import Label from './Label';

const MultiSelect = ({
  fieldKey,
  fieldsData,
  setFieldsData,
  placeholder,
  options,
  label,
  required,
  wrapperClassName,
  optionsPath,
  searchPath
}) => {
  const cleanOptions = (options) =>
    options.map((option) => ({
      label: option.label,
      value: option.key
    }));

  const handleChange = (val) => {
    setFieldsData({ ...fieldsData, [fieldKey]: val });
  };
  const [optionsToRender, setOptionsToRender] = useState([]);
  const [dynamicOptions, setDynamicOptions] = useState(null);

  useEffect(() => {
    if (optionsPath) {
      fetchOptions(optionsPath).then((optionsData) => {
        const cleanedOptions = cleanOptions(optionsData);
        setOptionsToRender(cleanedOptions);
        setDynamicOptions(cleanedOptions);
      });
    }
  }, [optionsPath]);

  useEffect(() => {
    setOptionsToRender(cleanOptions(options));
  }, [options]);

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

  return (
    <>
      <ComboBox onChange={handleChange} value={fieldsData[fieldKey]} isMulti>
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
