import React, { useRef, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import {
  ComboBox,
  ComboboxLabel,
  ComboboxOptionGroup,
  ComboboxOptionItem,
  ComboboxTrigger
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import O11yLoader from 'common/O11yLoader';
import PropTypes from 'prop-types';

const VIRTUALIZE_AFTER = 100;

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
  optionsListWrapperClassName,
  isLoading,
  isAsyncSearch,
  onSearch,
  stickyFooter
}) => {
  const [query, setQuery] = useState('');
  const stickyRef = useRef(null);

  const handleSearch = (val) => {
    if (!isAsyncSearch) {
      setQuery(val);
    }
    onSearch(val);
  };

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
      isMulti={!!filteredOptions.length && isMulti}
      disabled={disabled}
      // isLoadingRight={isLoading}
    >
      {label && <ComboboxLabel>{label}</ComboboxLabel>}
      <ComboboxTrigger
        placeholder={placeholder}
        onInputValueChange={handleSearch}
      />
      <ComboboxOptionGroup
        wrapperClassName={twClassNames(
          'w-80 max-h-72 relative',
          optionsListWrapperClassName,
          {
            'h-72': filteredOptions.length > VIRTUALIZE_AFTER
          }
        )}
      >
        {!filteredOptions.length && !isLoading && (
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
        {isLoading ? (
          <div className="p-2">
            <O11yLoader
              text="Fetching..."
              textClass="text-sm text-base-500"
              loaderClass="w-6 h-6"
            />
          </div>
        ) : (
          <>
            {filteredOptions.length > VIRTUALIZE_AFTER ? (
              <Virtuoso
                style={virtuosoStyles}
                data={filteredOptions || []}
                overscan={10}
                itemContent={(idx, item) => (
                  <>
                    <ComboboxOptionItem
                      option={item}
                      checkPosition={checkPosition}
                      wrapperClassName="text-sm"
                    />
                    {idx === filteredOptions.length - 1 && stickyFooter && (
                      <div
                        style={{ height: stickyRef.current?.clientHeight }}
                      />
                    )}
                  </>
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
            {!!filteredOptions?.length && stickyFooter && (
              <div
                className={twClassNames(
                  'sticky -bottom-1 flex bg-white pb-3 pl-3',
                  {
                    'absolute w-full bottom-0':
                      filteredOptions?.length > VIRTUALIZE_AFTER
                  }
                )}
                ref={stickyRef}
              >
                {stickyFooter}
              </div>
            )}
          </>
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
  optionsListWrapperClassName: PropTypes.string,
  isLoading: PropTypes.bool,
  isAsyncSearch: PropTypes.bool,
  onSearch: PropTypes.func,
  stickyFooter: PropTypes.node
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
  optionsListWrapperClassName: '',
  isLoading: false,
  isAsyncSearch: false,
  onSearch: () => {},
  stickyFooter: null
};
export default O11yComboBox;
