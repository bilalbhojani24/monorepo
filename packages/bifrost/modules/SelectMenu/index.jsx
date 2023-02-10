import React, { Fragment } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

import {
  arrayOf,
  bool,
  func,
  number,
  oneOf,
  oneOfType,
  shape,
  string
} from '../../shared/proptypesConstants';
import Checkbox from '../Checkbox';

import { CHECK_POSITION } from './const/selectMenuConstants';

import './styles.scss';

const SelectMenu = (props) => {
  const {
    label,
    options,
    onChange,
    isMultiSelect,
    defaultValue,
    checkPosition,
    placeholder,
    value
  } = props;

  const renderSingleOptions = (opts) => {
    if (opts)
      return (
        <div className="flex items-center truncate">
          {opts?.image && (
            <img
              className="mr-2 h-6 w-6 shrink-0 rounded-full"
              src={opts.image}
              alt={opts.label}
            />
          )}
          {opts?.label}
        </div>
      );
    return placeholder;
  };

  const renderMultiOptions = (opts) => {
    if (opts.length) return opts?.map((val) => val.label).join(', ');
    return placeholder;
  };

  return (
    <Listbox
      value={value ?? undefined}
      defaultValue={defaultValue ?? undefined}
      onChange={(val) => {
        if (onChange) onChange(val);
      }}
      multiple={isMultiSelect}
    >
      {({ open }) => (
        <>
          <Listbox.Label className="text-base-700 block text-sm font-medium">
            {label}
          </Listbox.Label>
          <div className="relative mt-1">
            <Listbox.Button className="border-base-300 focus:ring-brand-500 focus:border-brand-500 relative w-full cursor-default rounded-md border bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:ring-1 sm:text-sm">
              {({ value: buttonValue }) => (
                <>
                  <span className="flex items-center truncate">
                    {isMultiSelect && Array.isArray(buttonValue)
                      ? renderMultiOptions(buttonValue)
                      : renderSingleOptions(buttonValue)}
                  </span>

                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    {isMultiSelect && buttonValue?.length ? (
                      <span className="mr-1 font-bold">{`(${buttonValue.length})`}</span>
                    ) : null}
                    <ChevronUpDownIcon
                      className="text-base-400 h-5 w-5"
                      aria-hidden="true"
                    />
                  </span>
                </>
              )}
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5  focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    className={({ active }) =>
                      twClassNames(
                        {
                          'bg-brand-600 text-white': active && !isMultiSelect,
                          'text-base-900': !active,
                          'py-2 pl-3 pr-9':
                            checkPosition === CHECK_POSITION[1] &&
                            !isMultiSelect,
                          'py-2 pl-8 pr-4':
                            checkPosition === CHECK_POSITION[0] &&
                            !isMultiSelect,
                          'pb-4 pl-3 hover:bg-base-50': isMultiSelect
                        },
                        'relative cursor-pointer select-none'
                      )
                    }
                    value={option}
                  >
                    {({ active, selected }) => (
                      <>
                        {!isMultiSelect ? (
                          <div className="flex items-center">
                            {option.image && (
                              <img
                                src={option.image}
                                alt=""
                                className="mr-2 h-6 w-6 shrink-0 rounded-full"
                              />
                            )}

                            <span
                              className={twClassNames(
                                {
                                  'font-semibold': selected,
                                  'font-normal': !selected
                                },
                                'block truncate'
                              )}
                            >
                              {option.label}
                            </span>
                            {selected && (
                              <span
                                className={twClassNames(
                                  {
                                    'text-white': active,
                                    'text-brand-600': !active,
                                    'right-0 pr-4':
                                      checkPosition === CHECK_POSITION[1],
                                    'left-0 pl-1.5':
                                      checkPosition === CHECK_POSITION[0]
                                  },
                                  'absolute inset-y-0 flex items-center'
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                          </div>
                        ) : (
                          <Checkbox
                            data={{
                              label: option.label,
                              value: option.value
                            }}
                            border={false}
                            wrapperClassName="py-0"
                            checked={selected}
                          />
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

SelectMenu.propTypes = {
  checkPosition: oneOf(CHECK_POSITION),
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
  isMultiSelect: bool,
  label: string,
  options: arrayOf(
    shape({
      value: oneOfType([number, string]),
      label: string,
      image: string
    })
  ).isRequired,
  placeholder: string,
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
  checkPosition: CHECK_POSITION[0],
  defaultValue: null,
  isMultiSelect: false,
  label: '',
  placeholder: 'Placeholder...',
  onChange: () => {},
  value: null
};

export default SelectMenu;
