import React, { useCallback, useEffect, useState } from 'react';
import {
  ComboBox,
  ComboboxOptionGroup,
  ComboboxOptionItem,
  ComboboxTrigger
} from '@browserstack/bifrost';
import { makeDebounce } from '@browserstack/utils';

import { fetchOptions } from '../../../api';
import useRequiredFieldError from '../../hooks/useRequiredFieldError';
import Label from '../Label';

const NestedSingleValueSelect = ({
  label,
  value,
  options,
  fieldKey,
  required,
  fieldErrors,
  fieldsData,
  searchPath,
  optionsPath,
  placeholder,
  setFieldsData,
  wrapperClassName,
  areSomeRequiredFieldsEmpty
}) => {
  const cleanOptions = (data) =>
    Array.isArray(data) &&
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
        ticketTypes: currOption.ticket_types,
        options: currOption.options
      });
      return acc;
    }, []);

  const [optionsToRender, setOptionsToRender] = useState([]);
  const [dynamicOptions, setDynamicOptions] = useState(null);
  const [childOptions, setChildOptions] = useState(null);
  const requiredFieldError = useRequiredFieldError(
    required,
    fieldsData[fieldKey],
    areSomeRequiredFieldsEmpty
  );

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

  const handleChange = (val) => {
    const { options: nestedOptions, ...valWithoutChild } = val;
    const cleanedChildOptions = nestedOptions.map(
      ({ value, key, label: nestedOptionLabel }) => ({
        value: value || key,
        label: nestedOptionLabel
      })
    );
    const valWithOneChild = {
      ...valWithoutChild,
      child: cleanedChildOptions[0]
    };
    setFieldsData({ ...fieldsData, [fieldKey]: valWithOneChild });
    setChildOptions(cleanedChildOptions);
  };

  const handleChildChange = (val) => {
    setFieldsData({
      ...fieldsData,
      [fieldKey]: { ...fieldsData[fieldKey], child: val }
    });
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
    [optionsPath, dynamicOptions, options]
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
        value={fieldsData[fieldKey] ?? {}}
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
            <ComboboxOptionItem key={item.value} option={item} />
          ))}
        </ComboboxOptionGroup>
      </ComboBox>
      {childOptions && (
        <div className="mt-2">
          <ComboBox
            onChange={handleChildChange}
            value={fieldsData[fieldKey].child ?? {}}
          >
            <ComboboxTrigger />
            <ComboboxOptionGroup>
              {childOptions.map((item) => (
                <ComboboxOptionItem key={item.value} option={item} />
              ))}
            </ComboboxOptionGroup>
          </ComboBox>
        </div>
      )}
    </div>
  );
};
export default NestedSingleValueSelect;
