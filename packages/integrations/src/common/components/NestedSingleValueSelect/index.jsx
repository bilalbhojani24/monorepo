import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  ComboBox,
  ComboboxLabel,
  ComboboxOptionGroup,
  ComboboxOptionItem,
  ComboboxTrigger,
  Tooltip,
  TooltipBody
} from '@browserstack/bifrost';
import { makeDebounce } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { fetchOptionsThunk } from '../../../api';
import useRequiredFieldError from '../../hooks/useRequiredFieldError';
import { FieldType, SingleValueSelectRawOptionType } from '../types';

const NestedSingleValueSelect = ({
  label,
  value,
  schema,
  options,
  fieldKey,
  required,
  fieldsData,
  searchPath,
  fieldErrors,
  optionsPath,
  placeholder,
  defaultValue,
  setFieldsData,
  wrapperClassName,
  areSomeRequiredFieldsEmpty
}) => {
  const [areOptionsLoading, setAreOptionsLoading] = useState(false);
  const dispatch = useDispatch();
  const cleanOptions = (data) =>
    Array.isArray(data) &&
    data.reduce((acc, currOption) => {
      const image =
        typeof currOption.icon === 'object'
          ? Object.values(currOption.icon)[0]
          : currOption.image || currOption.icon;
      const val = currOption.value || currOption.id || currOption.key;

      acc.push({
        value: val,
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
    fieldsData?.[fieldKey],
    areSomeRequiredFieldsEmpty
  );
  const shouldFetchIntialOptions = useRef(Boolean(optionsPath));
  const initialOptions = useRef(null);
  const lengthOfOptionsToRender = optionsToRender?.length;

  const getOptions = makeDebounce(() => {
    setAreOptionsLoading(true);
    dispatch(fetchOptionsThunk({ path: optionsPath, isDefaultOptions: true }))
      .then(({ payload: optionsData = [] }) => {
        const cleanedOptions = cleanOptions(optionsData);
        setOptionsToRender(cleanedOptions);
        setDynamicOptions(cleanedOptions);
        if (shouldFetchIntialOptions.current) {
          initialOptions.current = cleanedOptions;
        }
        setAreOptionsLoading(false);
        shouldFetchIntialOptions.current = false;
      })
      .catch(() => {
        setAreOptionsLoading(false);
      });
  }, 500);

  const handleOpen = (isOpen) => {
    if (
      shouldFetchIntialOptions.current &&
      isOpen &&
      optionsPath &&
      !lengthOfOptionsToRender
    ) {
      getOptions();
    }
  };

  useEffect(() => {
    if (
      (value || defaultValue) &&
      !fieldsData?.[fieldKey] &&
      typeof setFieldsData === 'function'
    ) {
      const [cleanedValue] = cleanOptions([value || defaultValue]);
      if (cleanedValue.options) {
        const [cleanedChild] = cleanOptions([cleanedValue.options]);
        cleanedValue.child = cleanedChild;
      }
      setFieldsData((prev) => ({ ...prev, [fieldKey]: cleanedValue }));
      const currentParentItem = options?.find(
        (parentOption) => parentOption.key === cleanedValue.value
      );
      if (currentParentItem) {
        const cleanedChildOptions = cleanOptions(
          currentParentItem.options ?? []
        );
        setChildOptions(cleanedChildOptions);
      }
    }
  }, [value, defaultValue, fieldsData, fieldKey, setFieldsData, options]);

  useEffect(() => {
    initialOptions.current = cleanOptions(options);
    setOptionsToRender(cleanOptions(options));
  }, [options]);

  const handleChange = (val) => {
    const { options: nestedOptions = [], ...valWithoutChild } = val;
    const cleanedChildOptions = nestedOptions.map(
      ({ value: nestedOptionValue, key, label: nestedOptionLabel }) => ({
        value: nestedOptionValue || key,
        label: nestedOptionLabel
      })
    );
    const valWithOneChild = {
      ...valWithoutChild,
      child: cleanedChildOptions[0]
    };
    setFieldsData((prev) => ({ ...prev, [fieldKey]: valWithOneChild }));
    setChildOptions(cleanedChildOptions);
  };

  const handleChildChange = (val) => {
    setFieldsData((prev) => ({
      ...prev,
      [fieldKey]: { ...fieldsData[fieldKey], child: val }
    }));
  };

  const fetchQuery = (query) => {
    if (query) {
      fetchOptionsThunk({
        path: searchPath + query,
        isDefaultOptions: false
      }).then(({ payload: optionsData = [] }) => {
        if (Array.isArray(options) && optionsData.length) {
          const cleanedOptions = cleanOptions(optionsData);
          setOptionsToRender(cleanedOptions);
          setDynamicOptions(cleanedOptions);
        }
      });
    }
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchQuery = useCallback(makeDebounce(fetchQuery, 500), [
    searchPath
  ]);

  const handleInputChange = (inputValue) => {
    const query = inputValue?.trim();
    if (searchPath) {
      debouncedFetchQuery(query);
    }
    if (query) {
      searchInOptions(query);
    } else {
      setOptionsToRender(initialOptions.current);
    }
  };

  const shouldShowNoOptionsForParent =
    !lengthOfOptionsToRender && !shouldFetchIntialOptions.current;
  const shouldShowNoOptionsForChild =
    !childOptions?.length && !areOptionsLoading;

  const noOptionsTextForParent =
    (shouldShowNoOptionsForParent
      ? 'No Options'
      : shouldFetchIntialOptions.current && 'Loading...') || '';

  const noOptionsTextForChild = shouldShowNoOptionsForChild ? 'No Options' : '';

  return (
    <div
      className="py-3"
      data-field-type={schema?.field}
      data-field-key={fieldKey}
    >
      <ComboBox
        onChange={handleChange}
        value={fieldsData[fieldKey] ?? {}}
        errorText={requiredFieldError || fieldErrors?.[fieldKey]}
        isLoadingRight={areOptionsLoading}
        onOpenChange={handleOpen}
        noOptionsText={noOptionsTextForParent}
        isMandatory={required}
      >
        <ComboboxLabel>{label}</ComboboxLabel>
        <ComboboxTrigger
          placeholder={placeholder}
          wrapperClassName={wrapperClassName}
          onInputValueChange={handleInputChange}
        />
        <ComboboxOptionGroup maxWidth={300} wrapperClassName="flex flex-col">
          {optionsToRender?.map((item) => (
            <Tooltip
              theme="dark"
              placementSide="right"
              content={
                <TooltipBody wrapperClassName="mb-0">{item.label}</TooltipBody>
              }
            >
              <ComboboxOptionItem key={item.value} option={item} />
            </Tooltip>
          ))}
        </ComboboxOptionGroup>
      </ComboBox>
      {Boolean(childOptions?.length) && (
        <div className="mt-2">
          <ComboBox
            onChange={handleChildChange}
            value={fieldsData?.[fieldKey]?.child}
            noOptionsText={noOptionsTextForChild}
          >
            <ComboboxTrigger />
            {Boolean(childOptions?.length) && (
              <ComboboxOptionGroup wrapperClassName="flex flex-col">
                {childOptions?.map((item) => (
                  <Tooltip
                    theme="dark"
                    placementSide="right"
                    content={
                      <TooltipBody wrapperClassName="mb-0">
                        {item.label}
                      </TooltipBody>
                    }
                  >
                    <ComboboxOptionItem key={item.value} option={item} />
                  </Tooltip>
                ))}
              </ComboboxOptionGroup>
            )}
          </ComboBox>
        </div>
      )}
    </div>
  );
};

NestedSingleValueSelect.propTypes = {
  ...FieldType,
  options: PropTypes.arrayOf(SingleValueSelectRawOptionType),
  searchPath: PropTypes.string,
  optionsPath: PropTypes.string
};

NestedSingleValueSelect.defaultProps = {
  options: [],
  searchPath: '',
  optionsPath: ''
};
export default NestedSingleValueSelect;
