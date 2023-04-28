import React, { forwardRef, useRef, useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Combobox } from '@headlessui/react';
import * as Popover from '@radix-ui/react-popover';
import {
  arrayOf,
  bool,
  func,
  node,
  number,
  oneOfType,
  shape,
  string
} from 'prop-types';

import { ComboboxContextData } from '../../shared/comboboxContext';

import RenderChildren from './components/RenderChildren';
import { findLastActionItemHelper } from './helper';

const ComboBox = forwardRef((props, ref) => {
  const {
    children,
    defaultValue,
    errorText,
    onChange,
    isBadge,
    isMulti,
    noResultFoundText,
    noOptionsText,
    value,
    onOpenChange,
    isLoading,
    loadingText,
    isLoadingRight,
    disabled
  } = props;

  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(0);
  const [query, setQuery] = useState('');
  const [currentSelectedValues, setCurrentSelectedValues] = useState([]);

  const comboInputRef = useRef();

  return (
    <ComboboxContextData.Provider
      value={{
        isMulti,
        width,
        setWidth,
        errorText,
        value,
        open,
        setOpen,
        isLoading,
        loadingText,
        isLoadingRight,
        disabled,
        query,
        setQuery,
        isBadge,
        currentSelectedValues,
        setCurrentSelectedValues,
        noResultFoundText,
        noOptionsText,
        comboInputRef
      }}
    >
      <Popover.Root open={open}>
        <Combobox
          ref={ref}
          as="div"
          value={value ?? undefined}
          defaultValue={defaultValue ?? undefined}
          onChange={(selectedValue) => {
            if (onChange) {
              onChange(
                selectedValue,
                isMulti
                  ? findLastActionItemHelper(
                      selectedValue,
                      currentSelectedValues
                    )
                  : selectedValue
              );
              comboInputRef.current.value = '';
            }
            if (query) setQuery('');
          }}
          multiple={isMulti || isBadge}
          by={(o, n) => {
            if (o && n) return o.value === n.value;
            return null;
          }}
          disabled={disabled}
          className={twClassNames({
            'pointer-events-none': isLoading || isLoadingRight
          })}
        >
          {({ open: dropdownOpen, value: selectedValues }) => (
            <RenderChildren
              open={dropdownOpen}
              onOpenChange={onOpenChange}
              selectedValues={selectedValues}
            >
              {children}
            </RenderChildren>
          )}
        </Combobox>
        {errorText && (
          <p className="text-danger-600 mt-2 text-sm">{errorText}</p>
        )}
      </Popover.Root>
    </ComboboxContextData.Provider>
  );
});

ComboBox.propTypes = {
  children: node.isRequired,
  defaultValue: oneOfType([
    arrayOf(
      shape({
        value: oneOfType([string, number]).isRequired,
        label: string.isRequired,
        image: string
      })
    ),
    shape({
      value: oneOfType([string, number]).isRequired,
      label: string.isRequired,
      image: string
    })
  ]),
  disabled: bool,
  isLoading: bool,
  isLoadingRight: bool,
  loadingText: string,
  errorText: string,
  noResultFoundText: string,
  noOptionsText: string,
  isMulti: bool,
  isBadge: bool,
  onChange: func,
  value: oneOfType([
    arrayOf(
      shape({
        value: oneOfType([string, number]).isRequired,
        label: string.isRequired,
        image: string
      })
    ),
    shape({
      value: oneOfType([string, number]).isRequired,
      label: string.isRequired,
      image: string
    })
  ]),
  onOpenChange: func
};

ComboBox.defaultProps = {
  defaultValue: null,
  disabled: false,
  isLoading: false,
  isLoadingRight: false,
  isBadge: false,
  loadingText: 'Loading',
  noResultFoundText: 'No results found',
  noOptionsText: 'No options available',
  errorText: '',
  isMulti: false,
  onChange: () => {},
  value: null,
  onOpenChange: null
};

export default ComboBox;
