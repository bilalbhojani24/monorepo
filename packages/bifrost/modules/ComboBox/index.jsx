/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Combobox } from '@headlessui/react';
import PropTypes from 'prop-types';

import { CHECK_POSITION } from './const/comboBoxConstants';
import ComboBoxOptions from './ComboBoxOptions';
import ComboBoxTrigger from './ComboBoxTrigger';

import './styles.scss';

const ComboBox = (props) => {
  const {
    checkPosition,
    defaultValue,
    label,
    onChange,
    options,
    isMulti,
    value,
  } = props;
  const [query, setQuery] = useState('');
  const [selectOptions, setSelectedOptions] = useState(value || null);

  const filteredOptions =
    query === ''
      ? options
      : options.filter((opt) =>
          opt.label.toLowerCase().includes(query.toLowerCase()),
        );

  return (
    <Combobox
      as="div"
      {...(value && { value: selectOptions })}
      onChange={(selection) => {
        setSelectedOptions(selection);
        if (onChange) onChange(selection);
      }}
      multiple={isMulti}
      {...(defaultValue && { defaultValue })}
    >
      <Combobox.Label className="text-base-700 block text-sm font-medium">
        {label}
      </Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          className="border-base-300 focus:border-brand-500 focus:ring-brand-500 w-full rounded-md border bg-white py-2 pl-3 pr-10 shadow-sm focus:outline-none focus:ring-1 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(p) =>
            isMulti && Array.isArray(p)
              ? p?.map((childElement) => childElement.label).join(', ')
              : p?.label
          }
        />
        {/* trigger */}
        <ComboBoxTrigger isMulti={isMulti} selectOptions={selectOptions} />

        {/* options */}
        <ComboBoxOptions
          isMulti={isMulti}
          filteredOptions={filteredOptions}
          checkPosition={checkPosition}
        />
      </div>
    </Combobox>
  );
};

ComboBox.propTypes = {
  checkPosition: PropTypes.string,
  defaultValue: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        label: PropTypes.string.isRequired,
        image: PropTypes.string,
      }),
    ),
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
      image: PropTypes.string,
    }),
  ]),
  isMulti: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
      image: PropTypes.string,
    }),
  ),
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        label: PropTypes.string.isRequired,
        image: PropTypes.string,
      }),
    ),
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
      image: PropTypes.string,
    }),
  ]),
};
ComboBox.defaultProps = {
  checkPosition: CHECK_POSITION[0],
  defaultValue: null,
  isMulti: false,
  label: '',
  onChange: () => {},
  options: [],
  value: null,
};

export default ComboBox;
