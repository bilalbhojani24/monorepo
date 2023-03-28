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

import { fetchOptions } from '../../../api';
import useRequiredFieldError from '../../hooks/useRequiredFieldError';
import Label from '../Label';

const SingleValueSelect = ({
  label,
  value,
  options,
  fieldKey,
  disabled,
  required,
  searchPath,
  fieldsData = {},
  fieldErrors,
  optionsPath,
  placeholder,
  defaultValue,
  setFieldsData,
  wrapperClassName,
  selectFirstByDefault = false,
  areSomeRequiredFieldsEmpty
}) => {
  const cleanOptions = (data) =>
    Array.isArray(data) &&
    data.reduce((acc, currOption) => {
      // pick image url from icons -  which is either an object
      // or a single value
      const image =
        typeof currOption.icon === 'object'
          ? Object.values(currOption.icon)[0]
          : currOption.image || currOption.icon;

      // option can have value in 3 possible keys
      const optionValue = currOption.value || currOption.id || currOption.key;

      // map them to support UI comp and also create post call
      acc.push({
        value: optionValue,
        image,
        label: currOption.label,
        ticketTypes: currOption.ticket_types
      });
      return acc;
    }, []);

  const [cleanedValue] = cleanOptions([(value || defaultValue) ?? {}]);

  useEffect(() => {
    if ((value || defaultValue) && typeof setFieldsData === 'function') {
      setFieldsData({ ...fieldsData, [fieldKey]: cleanedValue });
    }
  }, [value, defaultValue]);

  const [optionsToRender, setOptionsToRender] = useState([]);
  const [dynamicOptions, setDynamicOptions] = useState(null);
  const previousOptions = usePrevious(optionsToRender);
  const requiredFieldError = useRequiredFieldError(
    required,
    fieldsData[fieldKey],
    areSomeRequiredFieldsEmpty
  );

  const appendOptionIfMissing = (optionList = [], target) => {
    if (target) {
      const isInOptions =
        optionList?.findIndex((option) => option?.key === target?.key) !== -1;
      if (!isInOptions) {
        return [target, ...optionList];
      }
    }
    return optionList;
  };

  useEffect(() => {
    if (optionsPath) {
      fetchOptions(optionsPath).then((optionsData) => {
        const cleanedOptions = cleanOptions(
          appendOptionIfMissing(optionsData, value || defaultValue)
        );
        setOptionsToRender(cleanedOptions);
        setDynamicOptions(cleanedOptions);
      });
    }
  }, [optionsPath]);

  useEffect(() => {
    setOptionsToRender(
      cleanOptions(appendOptionIfMissing(options, value || defaultValue))
    );
  }, [value, options, defaultValue]);

  useEffect(() => {
    if (
      selectFirstByDefault &&
      typeof setFieldsData === 'function' &&
      (!fieldsData?.[fieldKey]?.length < 1 ||
        optionsToRender !== previousOptions)
    ) {
      setFieldsData({ ...fieldsData, [fieldKey]: optionsToRender[0] });
    }
  }, [
    selectFirstByDefault,
    optionsToRender,
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
    [options, dynamicOptions, fetchQuery]
  );

  const debouncedFetchQuery = useCallback(makeDebounce(fetchQuery, 300), []);

  const handleInputChange = (e) => {
    const query = e.target.value?.trim();
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
    <div className="py-3">
      <ComboBox
        onChange={handleChange}
        value={(fieldsData[fieldKey] || cleanedValue) ?? {}}
        errorText={requiredFieldError || fieldErrors?.[fieldKey]}
        disabled={disabled}
      >
        <Label label={label} required={required} />
        <ComboboxTrigger
          placeholder={placeholder}
          wrapperClassName={wrapperClassName}
          onInputValueChange={handleInputChange}
        />
        <ComboboxOptionGroup>
          {optionsToRender?.map((item) => (
            <ComboboxOptionItem key={item.value} option={item} />
          ))}
        </ComboboxOptionGroup>
      </ComboBox>
    </div>
  );
};

SingleValueSelect.propTypes = {
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

SingleValueSelect.defaultProps = {
  placeholder: null,
  options: [],
  required: false,
  wrapperClassName: ''
};

export default SingleValueSelect;
