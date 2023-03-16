import React, { useState } from 'react';
import { Listbox } from '@headlessui/react';
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

import { SelectMenuContextData } from '../../shared/selectMenuContext';

import RenderChildren from './components/RenderChildren';

const SelectMenu = (props) => {
  const [width, setWidth] = useState(0);
  const [showCount, setShowCount] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    children,
    errorText,
    onChange,
    isMulti,
    defaultValue,
    value,
    onOpenChange,
    disabled
  } = props;

  return (
    <SelectMenuContextData.Provider
      value={{
        isMulti,
        setWidth,
        width,
        showCount,
        setShowCount,
        errorText,
        open,
        setOpen,
        disabled
      }}
    >
      <Popover.Root open={open}>
        <Listbox
          value={value ?? undefined}
          defaultValue={defaultValue ?? undefined}
          onChange={(val) => {
            if (onChange) onChange(val);
          }}
          multiple={isMulti}
          by={(o, n) => {
            if (o && n) return o.value === n.value;
            return null;
          }}
          disabled={disabled}
        >
          {({ open: dropdownOpen }) => (
            <RenderChildren open={dropdownOpen} onOpenChange={onOpenChange}>
              {children}
            </RenderChildren>
          )}
        </Listbox>
        {errorText && (
          <p className="text-danger-600 mt-2 text-sm">{errorText}</p>
        )}
      </Popover.Root>
    </SelectMenuContextData.Provider>
  );
};

SelectMenu.propTypes = {
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
  onOpenChange: func,
  disabled: bool
};

SelectMenu.defaultProps = {
  defaultValue: null,
  errorText: '',
  isMulti: false,
  onChange: () => {},
  value: null,
  onOpenChange: null,
  disabled: false
};

export default SelectMenu;
