import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
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
import useRequiredFieldError from '../../hooks/useRequiredFieldError';
import Label from '../Label';
import { FieldType, SingleValueSelectRawOptionType } from '../types';

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
  selectFirstOnOptionChange = false,
  areSomeRequiredFieldsEmpty,
  areOptionsLoading: areOptionsLoadingProps = false
}) => {
  const [areOptionsLoading, setAreOptionsLoading] = useState(false);
  const dispatch = useDispatch();
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
      setFieldsData({ ...fieldsData, [fieldKey]: cleanedValue });
    }
  }, [value, defaultValue, fieldsData, fieldKey, setFieldsData, cleanedValue]);

  const [optionsToRender, setOptionsToRender] = useState([]);
  const [dynamicOptions, setDynamicOptions] = useState(null);
  const previousOptions = usePrevious(optionsToRender);
  const requiredFieldError = useRequiredFieldError(
    required,
    fieldsData?.[fieldKey],
    areSomeRequiredFieldsEmpty
  );
  const shouldFetchIntialOptions = useRef(true);

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

  const getOptions = makeDebounce(() => {
    setAreOptionsLoading(true);
    dispatch(fetchOptionsThunk({ path: optionsPath, isDefaultOptions: true }))
      .then(({ payload: optionsData = [] }) => {
        const cleanedOptions = cleanOptions(
          appendOptionIfMissing(optionsData, value || defaultValue)
        );
        setOptionsToRender(cleanedOptions);
        setDynamicOptions(cleanedOptions);
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
      !optionsToRender?.length
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
    if (
      (typeof setFieldsData === 'function' &&
        !fieldsData?.[fieldKey] &&
        selectFirstByDefault &&
        optionsToRender?.[0]) ||
      (selectFirstOnOptionChange && optionsToRender !== previousOptions)
    ) {
      setFieldsData({ ...fieldsData, [fieldKey]: optionsToRender?.[0] });
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
    if (typeof setFieldsData === 'function') {
      setFieldsData({ ...fieldsData, [fieldKey]: val });
    }
  };

  const fetchQuery = (query) => {
    if (query) {
      dispatch(
        fetchOptionsThunk({ path: searchPath + query, isDefautOptions: false })
      ).then(({ payload: optionsData = [] }) => {
        const cleanedOptions = cleanOptions(optionsData);
        setOptionsToRender(cleanedOptions);
        setDynamicOptions(cleanedOptions);
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
      if (filtered.length) {
        setOptionsToRender(filtered);
      }
    },
    [optionsPath, dynamicOptions, options]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const isLoading = areOptionsLoading || areOptionsLoadingProps;

  return (
    <div className="py-3">
      <ComboBox
        onChange={handleChange}
        onOpenChange={handleOpen}
        value={
          !optionsToRender?.length
            ? null
            : (fieldsData[fieldKey] || cleanedValue) ?? {}
        }
        errorText={requiredFieldError || fieldErrors?.[fieldKey]}
        disabled={disabled}
        isLoading={isLoading}
        loadingText="Loading"
      >
        <Label label={label} required={required} />
        <ComboboxTrigger
          placeholder={placeholder}
          wrapperClassName={wrapperClassName}
          onInputValueChange={handleInputChange}
        />
        {Boolean(optionsToRender?.length) && (
          <ComboboxOptionGroup>
            {optionsToRender?.map((item) => (
              <ComboboxOptionItem key={item.value} option={item} />
            ))}
          </ComboboxOptionGroup>
        )}
        {!optionsToRender?.length && !isLoading && (
          <ComboboxOptionGroup>
            <ComboboxOptionItem
              key="no options"
              option={{ label: 'No options' }}
              disabled
            />
          </ComboboxOptionGroup>
        )}
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
