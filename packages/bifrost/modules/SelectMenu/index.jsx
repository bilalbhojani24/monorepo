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
} from '../../shared/proptypesConstants';
import { SelectMenuContextData } from '../../shared/selectMenuContext';

import './styles.scss';

const SelectMenu = (props) => {
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
};

SelectMenu.propTypes = {
  children: node.isRequired,
  defaultValue: oneOfType([
    shape({
      value: oneOfType([number, string]),
      label: string,
      image: string
    }),
    arrayOf(
      shape({
        label: number,
        value: oneOfType([number, string]),
        image: string
      })
    )
  ]),
  isMulti: bool,
  onChange: func,
  value: oneOfType([
    shape({
      value: oneOfType([number, string]),
      label: string,
      image: string
    }),
    arrayOf(
      shape({
        value: oneOfType([number, string]),
        null: string,
        image: string
      })
    )
  ])
};

SelectMenu.defaultProps = {
  defaultValue: null,
  isMulti: false,
  onChange: () => {},
  value: null
};

export default SelectMenu;
