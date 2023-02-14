import React, { useState } from 'react';
import { Combobox } from '@headlessui/react';
import * as Popover from '@radix-ui/react-popover';

import { ComboboxContextData } from '../../shared/comboboxContext';
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

const ComboBox = (props) => {
  const [width, setWidth] = useState(0);

  const { children, defaultValue, onChange, isMulti, value } = props;

  return (
    <ComboboxContextData.Provider
      value={{
        isMulti,
        width,
        setWidth
      }}
    >
      <Popover.Root>
        <Combobox
          as="div"
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
        </Combobox>
      </Popover.Root>
    </ComboboxContextData.Provider>
  );
};

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
ComboBox.defaultProps = {
  defaultValue: null,
  isMulti: false,
  onChange: () => {},
  value: null
};

export default ComboBox;
