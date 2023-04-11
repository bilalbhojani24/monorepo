import React, { useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import {
  ComboBox,
  ComboboxLabel,
  ComboboxOptionGroup,
  ComboboxOptionItem,
  ComboboxTrigger
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const O11yComboBox = ({
  disabled,
  isMulti,
  placeholder,
  label,
  options,
  onChange,
  value,
  checkPosition,
  virtuosoWidth,
  optionsListWrapperClassName
}) => {
  const [query, setQuery] = useState('');

  const filteredOptions =
    query === ''
      ? options
      : options.filter((opt) =>
          opt.label.toLowerCase().includes(query.toLowerCase())
        );

  const virtuosoStyles = { height: '100%' };
  if (virtuosoWidth) {
    virtuosoStyles.width = virtuosoWidth;
  }

  return (
    <ComboBox
      onChange={onChange}
      value={value}
      isMulti={filteredOptions.length && isMulti}
      disabled={disabled}
    >
      {label && <ComboboxLabel>{label}</ComboboxLabel>}
      <ComboboxTrigger
        placeholder={placeholder}
        onInputValueChange={(e) => setQuery(e.target.value)}
      />
      <ComboboxOptionGroup
        wrapperClassName={twClassNames('w-80', optionsListWrapperClassName, {
          'h-60': filteredOptions.length > 10
        })}
      >
        {!filteredOptions.length && (
          <ComboboxOptionItem
            option={{
              label: 'No options available',
              value: 'noData'
            }}
            disabled
            checkPosition={checkPosition}
            wrapperClassName="text-sm"
          />
        )}
        {filteredOptions.length > 10 ? (
          <Virtuoso
            style={virtuosoStyles}
            data={filteredOptions || []}
            overscan={10}
            itemContent={(_, item) => (
              <ComboboxOptionItem
                option={item}
                checkPosition={checkPosition}
                wrapperClassName="text-sm"
              />
            )}
          />
        ) : (
          filteredOptions.map((item) => (
            <ComboboxOptionItem
              key={item.value}
              option={item}
              checkPosition={checkPosition}
              wrapperClassName="text-sm"
            />
          ))
        )}
      </ComboboxOptionGroup>
    </ComboBox>
  );
};

O11yComboBox.propTypes = {
  isMulti: PropTypes.bool,
  placeholder: PropTypes.string,
  checkPosition: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
      image: PropTypes.string
    })
  ),
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        label: PropTypes.string.isRequired,
        image: PropTypes.string
      })
    ),
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
      image: PropTypes.string
    })
  ]),
  virtuosoWidth: PropTypes.string,
  optionsListWrapperClassName: PropTypes.string
};

O11yComboBox.defaultProps = {
  isMulti: false,
  disabled: false,
  placeholder: '',
  checkPosition: '',
  label: '',
  options: [],
  onChange: () => {},
  value: null,
  virtuosoWidth: '',
  optionsListWrapperClassName: ''
};
export default O11yComboBox;
