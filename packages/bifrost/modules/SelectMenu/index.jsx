import React, { forwardRef, useState } from 'react';
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
} from '../../shared/proptypesConstants';
import { SelectMenuContextData } from '../../shared/selectMenuContext';

const SelectMenu = forwardRef((props, ref) => {
  const [width, setWidth] = useState(0);
  const { children, onChange, isMulti, defaultValue, value } = props;

  return (
    <SelectMenuContextData.Provider
      value={{
        isMulti,
        setWidth,
        width
      }}
    >
      <Popover.Root>
        <Listbox
          ref={ref}
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
        >
          {children}
        </Listbox>
      </Popover.Root>
    </SelectMenuContextData.Provider>
  );
});

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
  ])
};

SelectMenu.defaultProps = {
  defaultValue: null,
  isMulti: false,
  onChange: () => {},
  value: null
};

export default SelectMenu;
