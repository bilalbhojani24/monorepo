import React, { Fragment, useLayoutEffect, useRef, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
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
import { ChevronUpDownIcon } from '../Icon';

import { CHECK_POSITION } from './const/comboBoxConstants';
import { renderMultiOptions, renderSingleOptions } from './helper';

import './styles.scss';

const ComboBox = (props) => {
  const buttonRef = useRef();
  const [width, setWidth] = useState(0);

  const {
    checkPosition,
    defaultValue,
    label,
    onChange,
    options,
    isMulti,
    placeholder,
    value,
    renderOptions
  } = props;
  const [query, setQuery] = useState('');

  useLayoutEffect(() => {
    setWidth(buttonRef.current.offsetWidth);
  }, []);

  const filteredPeople =
    query === ''
      ? options
      : options.filter((opt) =>
          opt.label.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <ComboboxContextData.Provider
      value={{
        isMulti,
        checkPosition
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
          {({ open }) => (
            <div>
              <Combobox.Label className="text-base-700 block text-sm font-medium">
                {label}
              </Combobox.Label>

              <Popover.Trigger asChild ref={buttonRef}>
                <div className="relative">
                  <Combobox.Input
                    placeholder={placeholder}
                    className="border-base-300 focus:border-brand-500 focus:ring-brand-500 w-full rounded-md border bg-white py-2 pl-3 pr-16 shadow-sm focus:outline-none focus:ring-1 sm:text-sm"
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={(dv) =>
                      isMulti && Array.isArray(dv)
                        ? renderMultiOptions(dv)
                        : renderSingleOptions(dv)
                    }
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    {({ value: buttonValue }) => (
                      <>
                        {isMulti && buttonValue?.length ? (
                          <span className="mr-1 font-bold">{`(${buttonValue?.length})`}</span>
                        ) : null}
                        <ChevronUpDownIcon
                          className="text-base-400 h-5 w-5"
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </Combobox.Button>
                </div>
              </Popover.Trigger>

              <Popover.Portal forceMount>
                <Popover.Content
                  asChild
                  style={{
                    width: `${width}px`
                  }}
                >
                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Combobox.Options
                      static
                      className="divide-base-100 border-base-200 z-50 my-1 max-h-60 w-full divide-y overflow-scroll rounded-md border bg-white shadow-lg outline-none"
                    >
                      {renderOptions}
                    </Combobox.Options>
                  </Transition>
                </Popover.Content>
              </Popover.Portal>
            </div>
          )}
        </Combobox>
      </Popover.Root>
    </ComboboxContextData.Provider>
  );
};

ComboBox.propTypes = {
  checkPosition: string,
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
  label: string,
  onChange: func,
  options: arrayOf(
    shape({
      value: oneOfType([string, number]).isRequired,
      label: string.isRequired,
      image: string
    })
  ).isRequired,
  placeholder: string,
  renderOptions: node.isRequired,
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
  checkPosition: CHECK_POSITION[0],
  defaultValue: null,
  isMulti: false,
  label: '',
  onChange: () => {},
  placeholder: 'Placeholder...',
  value: null
};

export default ComboBox;
