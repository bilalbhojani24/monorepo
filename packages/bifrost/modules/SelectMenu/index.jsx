import React, { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Checkbox from '../Checkbox';

import { CHECK_POSITION } from './const/selectMenuConstants';

import './styles.scss';

const getValue = (isMultiSelect, options) => {
  if (!isMultiSelect) return options[0];
  return [options[0]];
};

const SelectMenu = (props) => {
  const {
    label,
    options,
    onChange,
    isMultiSelect,
    defaultValue,
    checkPosition,
    value,
  } = props;
  const [selectedValues, setSelectedValues] = useState(
    value || getValue(isMultiSelect, options),
  );

  return (
    <>
      <Listbox
        value={selectedValues}
        onChange={(val) => {
          setSelectedValues(val);
          if (onChange) onChange(val);
        }}
        multiple={isMultiSelect}
        defaultValue={defaultValue}
      >
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium text-base-700">
              {label}
            </Listbox.Label>
            <div className="relative mt-1">
              <Listbox.Button className="focus:border-indigo-500 focus:ring-indigo-500 relative w-full cursor-default rounded-md border border-base-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-1 sm:text-sm">
                {({ value: buttonValue }) => (
                  <>
                    <span className="flex items-center truncate">
                      {isMultiSelect && Array.isArray(buttonValue) ? (
                        buttonValue.map((val) => val.label).join(', ')
                      ) : (
                        <div className="flex items-center truncate">
                          {buttonValue?.image && (
                            <img
                              className="mr-2 h-6 w-6 shrink-0 rounded-full"
                              src={buttonValue.image}
                              alt={buttonValue.label}
                            />
                          )}
                          {buttonValue?.label}
                        </div>
                      )}
                    </span>

                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      {isMultiSelect && buttonValue?.length ? (
                        <span className="mr-1 font-bold">{`(${buttonValue.length})`}</span>
                      ) : null}
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-base-400"
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
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {options.map((option) => (
                    <Listbox.Option
                      key={option.value}
                      className={({ active }) =>
                        classNames(
                          {
                            'bg-brand-600 text-white': active && !isMultiSelect,
                            'text-base-900': !active,
                            'py-2 pl-3 pr-9':
                              checkPosition === CHECK_POSITION[1] &&
                              !isMultiSelect,
                            'py-2 pl-8 pr-4':
                              checkPosition === CHECK_POSITION[0] &&
                              !isMultiSelect,
                            'pb-4 pl-3 hover:bg-base-50': isMultiSelect,
                          },
                          'relative cursor-pointer select-none',
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
                                className={classNames(
                                  {
                                    'font-semibold': selected,
                                    'font-normal': !selected,
                                  },
                                  'block truncate',
                                )}
                              >
                                {option.label}
                              </span>
                              {selected && (
                                <span
                                  className={classNames(
                                    {
                                      'text-white': active,
                                      'text-brand-600': !active,
                                      'right-0 pr-4':
                                        checkPosition === CHECK_POSITION[1],
                                      'left-0 pl-1.5':
                                        checkPosition === CHECK_POSITION[0],
                                    },
                                    'absolute inset-y-0 flex items-center',
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
                                value: option.value,
                              }}
                              border={false}
                              wrapperClass="py-0"
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
    </>
  );
};

SelectMenu.propTypes = {
  checkPosition: PropTypes.oneOf(CHECK_POSITION),
  defaultValue: PropTypes.oneOfType([
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
      image: PropTypes.string,
    }),
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.number,
        value: PropTypes.string,
        image: PropTypes.string,
      }),
    ),
  ]),
  isMultiSelect: PropTypes.bool,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
      image: PropTypes.string,
    }),
  ).isRequired,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
      image: PropTypes.string,
    }),
    PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number,
        null: PropTypes.string,
        image: PropTypes.string,
      }),
    ),
  ]),
};

SelectMenu.defaultProps = {
  checkPosition: CHECK_POSITION[0],
  defaultValue: null,
  isMultiSelect: false,
  label: '',
  onChange: () => {},
  value: null,
};

export default SelectMenu;
