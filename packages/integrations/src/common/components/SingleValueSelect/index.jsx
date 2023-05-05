import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ComboBox,
  ComboboxOptionGroup,
  ComboboxOptionItem,
  ComboboxTrigger
} from '@browserstack/bifrost';
import { usePrevious } from '@browserstack/hooks';
import { makeDebounce } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { fetchOptionsThunk } from '../../../api';
import { fetchBase64IconThunk } from '../../../api/fetchBase64Icon';
import { activeIntegrationSelector } from '../../../features/slices/integrationsSlice';
import useRequiredFieldError from '../../hooks/useRequiredFieldError';
import { baseURLSelector } from '../../slices/configSlice';
import Label from '../Label';
import { FieldType, SingleValueSelectRawOptionType } from '../types';

const SingleValueSelect = ({
  label,
  value,
  schema,
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
  onChange: onChangeHandler,
  selectFirstByDefault = false,
  selectFirstOnOptionChange = false,
  areSomeRequiredFieldsEmpty,
  areOptionsLoading: areOptionsLoadingProps = false
  // eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
  const [optionsToRender, setOptionsToRender] = useState(null);
  const [areOptionsLoading, setAreOptionsLoading] = useState(false);
  const initialOptions = useRef(null);
  const dispatch = useDispatch();
  const baseURL = useSelector(baseURLSelector);
  const activeIntegration = useSelector(activeIntegrationSelector);

  const handleIconError = (__, itemWithError) => {
    if (
      typeof itemWithError.image === 'string' &&
      baseURL &&
      itemWithError.image.includes(baseURL) &&
      !activeIntegration.value &&
      !optionsToRender
    ) {
      return;
    }
    dispatch(
      fetchBase64IconThunk({
        url: `${baseURL}/api/pm-tools/v1/resources/icons?uri=${itemWithError.image}&integration_key=${activeIntegration.value}`
      })
    ).then(({ payload: base64Image }) => {
      if (base64Image) {
        const itemInOptions = optionsToRender.find(
          (option) => option.value === itemWithError.value
        );
        itemInOptions.image = base64Image;
        setOptionsToRender([...optionsToRender]);
      }
    });
  };

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
    if (
      cleanedValue?.value &&
      !fieldsData?.[fieldKey] &&
      typeof setFieldsData === 'function'
    ) {
      setFieldsData((prev) => ({ ...prev, [fieldKey]: cleanedValue }));
    }
  }, [value, defaultValue, fieldsData, fieldKey, setFieldsData, cleanedValue]);

  const [dynamicOptions, setDynamicOptions] = useState(null);
  const previousOptions = usePrevious(optionsToRender);
  const requiredFieldError = useRequiredFieldError(
    required,
    fieldsData?.[fieldKey],
    areSomeRequiredFieldsEmpty
  );
  const shouldFetchIntialOptions = useRef(Boolean(optionsPath));
  const lengthOfOptionsToRender = optionsToRender?.length;

  const appendOptionIfMissing = (optionList = [], target) => {
    if (target) {
      const isInOptions =
        optionList?.findIndex((option) =>
          option.key ? option.key === target.key : option.value === target.value
        ) !== -1;
      if (!isInOptions) {
        return [target, ...optionList];
      }
    }
    return optionList;
  };

  const getOptions = makeDebounce(() => {
    setAreOptionsLoading(true);
    dispatch(fetchOptionsThunk({ path: optionsPath, isDefaultOptions: true }))
      .then(({ payload: optionsData = [] }) => {
        const cleanedOptions = cleanOptions(
          appendOptionIfMissing(optionsData, value || defaultValue)
        );
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
    if (fieldsData?.[fieldKey]?.value) {
      initialOptions.current = appendOptionIfMissing(
        initialOptions.current,
        fieldsData?.[fieldKey]
      );
      setOptionsToRender(initialOptions.current);
      setDynamicOptions(initialOptions.current);
    }
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
    setOptionsToRender(
      cleanOptions(appendOptionIfMissing(options, value || defaultValue))
    );
  }, [value, options, defaultValue]);

  useEffect(() => {
    initialOptions.current = cleanOptions(options);
  }, [options]);

  useEffect(() => {
    if (
      (typeof setFieldsData === 'function' &&
        !fieldsData?.[fieldKey] &&
        selectFirstByDefault &&
        optionsToRender?.[0]) ||
      (selectFirstOnOptionChange && optionsToRender !== previousOptions)
    ) {
      setFieldsData((prev) => ({ ...prev, [fieldKey]: optionsToRender?.[0] }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectFirstByDefault,
    optionsToRender,
    previousOptions,
    fieldKey,
    fieldsData,
    setFieldsData
  ]);

  const handleChange = (val) => {
    if (typeof onChangeHandler === 'function') {
      onChangeHandler(fieldKey, val);
    } else if (typeof setFieldsData === 'function') {
      setFieldsData((prev) => ({ ...prev, [fieldKey]: val }));
    }
  };

  const [searchLoading, setSearchLoading] = useState(false);

  const fetchQuery = (query) => {
    if (query) {
      setSearchLoading(true);
      dispatch(
        fetchOptionsThunk({ path: searchPath + query, isDefautOptions: false })
      )
        .then(({ payload: optionsData = [] }) => {
          setSearchLoading(false);
          if (Array.isArray(options) && optionsData.length) {
            const cleanedOptions = cleanOptions(optionsData);
            setOptionsToRender(cleanedOptions);
            setDynamicOptions(cleanedOptions);
          }
        })
        .catch(() => {
          setSearchLoading(false);
        });
    }
  };

  const searchInOptions = useCallback(
    (query) => {
      const cleanedOptions = optionsPath
        ? dynamicOptions
        : initialOptions.current;
      const filtered = cleanedOptions?.filter(({ label: optionLabel }) =>
        optionLabel.toLowerCase().includes(query.toLowerCase())
      );
      setOptionsToRender(filtered);
    },
    [optionsPath, dynamicOptions]
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

  const isLoading = areOptionsLoading || areOptionsLoadingProps;
  const shouldShowNoOptions =
    !lengthOfOptionsToRender &&
    !isLoading &&
    !searchLoading &&
    !shouldFetchIntialOptions.current;

  const noOptionsText =
    (shouldShowNoOptions
      ? 'No Options'
      : shouldFetchIntialOptions.current && 'Loading...') || '';

  const noResultFoundText =
    (!lengthOfOptionsToRender ||
      (lengthOfOptionsToRender === 1 &&
        fieldsData?.[fieldKey]?.value === optionsToRender[0].value)) &&
    searchLoading
      ? 'Searching...'
      : undefined;

  return (
    <div
      className="py-3"
      data-field-type={schema?.field}
      data-field-key={fieldKey}
    >
      <ComboBox
        onChange={handleChange}
        onOpenChange={handleOpen}
        value={(fieldsData[fieldKey] || cleanedValue) ?? {}}
        errorText={requiredFieldError || fieldErrors?.[fieldKey]}
        disabled={disabled}
        isLoadingRight={
          isLoading || (!lengthOfOptionsToRender && searchLoading)
        }
        noOptionsText={noOptionsText}
        noResultFoundText={noResultFoundText}
      >
        <Label label={label} required={required} />
        <ComboboxTrigger
          placeholder={placeholder}
          wrapperClassName={wrapperClassName}
          onInputValueChange={handleInputChange}
        />
        <ComboboxOptionGroup maxWidth={300}>
          {(optionsToRender ?? []).map((item) => (
            <ComboboxOptionItem
              key={item.value}
              option={item}
              onImageError={(e) => handleIconError(e, item)}
            />
          ))}
        </ComboboxOptionGroup>
      </ComboBox>
    </div>
  );
};

SingleValueSelect.propTypes = {
  ...FieldType,
  options: PropTypes.arrayOf(SingleValueSelectRawOptionType),
  searchPath: PropTypes.string,
  optionsPath: PropTypes.string
};

SingleValueSelect.defaultProps = {
  options: [],
  searchPath: '',
  optionsPath: ''
};

export default SingleValueSelect;
