import React, { useEffect, useState } from 'react';
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

const SingleDynamicSelect = ({
  label,
  fieldKey,
  required,
  fieldsData,
  setFieldsData,
  placeholder,
  wrapperClassName,
  searchUrl,
  optionsPath
}) => {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    fetchOptions(optionsPath).then((optionsData) => {
      const cleanedOptions = optionsData.reduce((acc, currOption) => {
        const { icon, key, ...restOfOptionData } = currOption;
        const image = Object.values(icon)[0];
        acc.push({ ...restOfOptionData, value: key, image });
        return acc;
      }, []);
      setOptions(cleanedOptions);
    });
  }, [optionsPath]);

  const handleChange = (val) => {
    setFieldsData({ ...fieldsData, [fieldKey]: val });
  };

  const fetchQuery = (query) => {
    const cleanedQuery = query.trim();
    if (cleanedQuery) {
      console.log('querying for', query);
      // fetchOptions(searchUrl, cleanedQuery);
    }
  };

  const debouncedFetchQuery = makeDebounce(fetchQuery, 400);

  const handleQuery = (e) => {
    if (searchUrl) {
      debouncedFetchQuery(e.target.value);
    }
  };

  // if (options.length < 1) return null;

  return (
    <ComboBox onChange={handleChange} value={fieldsData[fieldKey]}>
      <Label label={label} required={required} />
      <ComboboxTrigger
        placeholder={placeholder}
        wrapperClassName={wrapperClassName}
        onInputValueChange={handleQuery}
      />
      <ComboboxOptionGroup>
        {options.map((item) => (
          <ComboboxOptionItem
            key={item.value}
            option={item}
            // wrapperClassName="text-base-500"
          />
        ))}
      </ComboboxOptionGroup>
    </ComboBox>
  );
};

SingleDynamicSelect.propTypes = {
  fieldsData: PropTypes.string.isRequired,
  setFieldsData: PropTypes.func.isRequired,
  fieldKey: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(),
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  wrapperClassName: PropTypes.string,
  searchUrl: PropTypes.string.isRequired,
  optionsUrl: PropTypes.string.isRequired
};

SingleDynamicSelect.defaultProps = {
  placeholder: null,
  options: [],
  required: false,
  wrapperClassName: ''
};

export default SingleDynamicSelect;
