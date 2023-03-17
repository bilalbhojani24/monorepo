import React, { useCallback, useEffect, useState } from 'react';
import {
  ComboBox,
  ComboboxOptionGroup,
  ComboboxOptionItem,
  ComboboxTrigger
} from '@browserstack/bifrost';
import { usePrevious } from '@browserstack/hooks';
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
  searchPath,
  optionsPath,
  options,
  selectFirstByDefault = false
}) => {
  const cleanOptions = (data) =>
    data.reduce((acc, currOption) => {
      const image =
        typeof currOption.icon === 'object'
          ? Object.values(currOption.icon)[0]
          : currOption.image || currOption.icon;
      const value = currOption.value || currOption.id || currOption.key;

      acc.push({
        value,
        image,
        label: currOption.label,
        ticketTypes: currOption.ticket_types
      });
      return acc;
    }, []);

  const [optionsToRender, setOptionsToRender] = useState([]);
  const [inputText, setInputText] = useState('');
  const previousOptions = usePrevious(optionsToRender);

  useEffect(() => {
    if (optionsPath) {
      fetchOptions(optionsPath).then((optionsData) => {
        const cleanedOptions = cleanOptions(optionsData);
        setOptionsToRender(cleanedOptions);
      });
    }
  }, [optionsPath]);

  useEffect(() => {
    setOptionsToRender(cleanOptions(options));
  }, [options]);

  useEffect(() => {
    if (
      selectFirstByDefault &&
      typeof setFieldsData === 'function' &&
      (!fieldsData?.[fieldKey]?.length < 1 ||
        (optionsToRender !== previousOptions && !inputText.trim()))
    ) {
      setFieldsData({ ...fieldsData, [fieldKey]: optionsToRender[0] });
    }
  }, [
    inputText,
    selectFirstByDefault,
    optionsToRender,
    previousOptions,
    fieldKey,
    fieldsData,
    setFieldsData
  ]);

  const handleChange = (val) => {
    setFieldsData({ ...fieldsData, [fieldKey]: val });
  };

  const fetchQuery = (query) => {
    fetchOptions(searchPath + query);
  };

  const searchInOptions = useCallback(
    (query) => {
      const cleanedOptions = cleanOptions(options);
      const filtered = cleanedOptions?.filter(({ label: optionLabel }) =>
        optionLabel.toLowerCase().startsWith(query.toLowerCase())
      );
      setOptionsToRender(filtered);
    },
    [options]
  );

  const debouncedFetchQuery = useCallback(() => {
    makeDebounce(fetchQuery, 400);
  }, []);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    const query = inputText.trim();
    if (query) {
      if (searchPath) {
        debouncedFetchQuery(query);
      }
      searchInOptions(query);
    } else {
      setOptionsToRender(cleanOptions(options));
    }
  }, [debouncedFetchQuery, searchPath, inputText, options, searchInOptions]);

  return (
    <ComboBox onChange={handleChange} value={fieldsData[fieldKey]}>
      <Label label={label} required={required} />
      <ComboboxTrigger
        placeholder={placeholder}
        wrapperClassName={wrapperClassName}
        onInputValueChange={handleInputChange}
      />
      <ComboboxOptionGroup>
        {optionsToRender.map((item) => (
          <ComboboxOptionItem key={item.value} option={item} />
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
  searchPath: PropTypes.string.isRequired,
  optionsPath: PropTypes.string.isRequired
};

SingleDynamicSelect.defaultProps = {
  placeholder: null,
  options: [],
  required: false,
  wrapperClassName: ''
};

export default SingleDynamicSelect;
