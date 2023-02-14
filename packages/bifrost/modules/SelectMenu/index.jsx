import React, { Fragment, useLayoutEffect, useRef, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
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

import { CHECK_POSITION } from './const/selectMenuConstants';
import { renderMultiOptions, renderSingleOptions } from './helper';

import './styles.scss';

const SelectMenu = (props) => {
  const buttonRef = useRef();
  const [width, setWidth] = useState(0);
  const {
    checkPosition,
    label,
    onChange,
    isMulti,
    defaultValue,
    placeholder,
    value,
    wrapperClassName,
    renderOptions
  } = props;

  useLayoutEffect(() => {
    setWidth(buttonRef.current.offsetWidth);
  }, []);

  return (
    <SelectMenuContextData.Provider
      value={{
        isMulti,
        checkPosition
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
          {({ open }) => (
            <div className={wrapperClassName}>
              {label && (
                <Listbox.Label className="text-base-700 mb-1 block text-sm font-medium">
                  {label}
                </Listbox.Label>
              )}
              <Popover.Trigger asChild>
                <Listbox.Button
                  ref={buttonRef}
                  className="border-base-300 focus:ring-brand-500 focus:border-brand-500 relative w-full cursor-default rounded-md border bg-white py-2 pl-3 pr-16 text-left shadow-sm focus:ring-1 sm:text-sm"
                >
                  {({ value: btnValue }) => (
                    <>
                      <span className="flex items-center truncate">
                        {isMulti && Array.isArray(btnValue)
                          ? renderMultiOptions(btnValue, placeholder)
                          : renderSingleOptions(btnValue, placeholder)}
                      </span>

                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        {isMulti && btnValue?.length ? (
                          <span className="mr-1 font-bold">{`(${btnValue.length})`}</span>
                        ) : null}
                        <ChevronUpDownIcon
                          className="text-base-400 h-5 w-5"
                          aria-hidden="true"
                        />
                      </span>
                    </>
                  )}
                </Listbox.Button>
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
                    <Listbox.Options
                      static
                      className="divide-base-100 border-base-200 z-50 my-1 max-h-60 w-full divide-y overflow-scroll rounded-md border bg-white shadow-lg outline-none"
                    >
                      {renderOptions}
                    </Listbox.Options>
                  </Transition>
                </Popover.Content>
              </Popover.Portal>
            </div>
          )}
        </Listbox>
      </Popover.Root>
    </SelectMenuContextData.Provider>
  );
};

SelectMenu.propTypes = {
  checkPosition: oneOfType(CHECK_POSITION),
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
  label: string,
  onChange: func,
  placeholder: string,
  renderOptions: node.isRequired,
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
  ]),
  wrapperClassName: string
};

SelectMenu.defaultProps = {
  checkPosition: CHECK_POSITION[0],
  defaultValue: null,
  isMulti: false,
  label: '',
  placeholder: 'Placeholder...',
  onChange: () => {},
  value: null,
  wrapperClassName: ''
};

export default SelectMenu;
