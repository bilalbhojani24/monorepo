import React, { forwardRef, useEffect, useRef, useState } from 'react';
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

const ComboBox = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(0);
  const [query, setQuery] = useState('');
  const [currentSelectedValues, setCurrentSelectedValues] = useState([]);

  const {
    children,
    defaultValue,
    errorText,
    onChange,
    isBadge,
    isMulti,
    value,
    onOpenChange,
    isLoading,
    loadingText,
    disabled
  } = props;

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
        disabled,
        query,
        setQuery,
        isBadge,
        currentSelectedValues,
        setCurrentSelectedValues
      }}
    >
      <Popover.Root open={open}>
        <Combobox
          ref={ref}
          as="div"
          value={value ?? undefined}
          defaultValue={defaultValue ?? undefined}
          onChange={(val) => {
            if (onChange) onChange(val);
            if (query) setQuery('');
          }}
          multiple={isMulti || isBadge}
          by={(o, n) => {
            if (o && n) return o.value === n.value;
            return null;
          }}
          disabled={disabled}
        >
          {({ open: dropdownOpen, value: currentValues }) => (
            <RenderChildren
              open={dropdownOpen}
              onOpenChange={onOpenChange}
              currentValues={currentValues}
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
  loadingText: string,
  errorText: string,
  isMulti: bool,
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
  loadingText: 'Loading',
  errorText: '',
  isMulti: false,
  onChange: () => {},
  value: null,
  onOpenChange: null
};

export default ComboBox;
