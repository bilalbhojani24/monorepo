import React, { useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Combobox } from '@headlessui/react';

import {
  arrayOf,
  bool,
  func,
  number,
  oneOfType,
  shape,
  string
} from '../../shared/proptypesConstants';
import Checkbox from '../Checkbox';
import { CheckIcon, ChevronUpDownIcon } from '../Icon';

import { CHECK_POSITION } from './const/comboBoxConstants';

import './styles.scss';

const ComboBox = (props) => {
  const {
    checkPosition,
    defaultValue,
    label,
    onChange,
    options,
    isMulti,
    placeholder,
    value
  } = props;
  const [query, setQuery] = useState('');

  const filteredPeople =
    query === ''
      ? options
      : options.filter((opt) =>
          opt.label.toLowerCase().includes(query.toLowerCase())
        );

  const renderSingleOptions = (opts) => {
    if (opts) return opts?.label;
    return null;
  };

  const renderMultiOptions = (opts) => {
    if (opts.length) return opts?.map((p) => p.label).join(', ');
    return null;
  };

  return (
    <Combobox
      as="div"
      value={value ?? undefined}
      defaultValue={defaultValue ?? undefined}
      onChange={(val) => {
        if (onChange) onChange(val);
      }}
      multiple={isMulti}
    >
      <Combobox.Label className="text-base-700 block text-sm font-medium">
        {label}
      </Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          placeholder={placeholder}
          className="border-base-300 focus:border-brand-500 focus:ring-brand-500 w-full rounded-md border bg-white py-2 pl-3 pr-10 shadow-sm focus:outline-none focus:ring-1 sm:text-sm"
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

        {filteredPeople.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {filteredPeople.map((option) => (
              <Combobox.Option
                key={option.value}
                value={option}
                className={({ active }) =>
                  twClassNames(
                    'relative cursor-pointer select-none py-2 pl-3 pr-9',
                    active && !isMulti
                      ? 'bg-brand-600 text-white'
                      : 'text-base-900',
                    {
                      'py-2 pl-3 pr-9':
                        checkPosition === CHECK_POSITION[1] && !isMulti,
                      'py-2 pl-8 pr-4':
                        checkPosition === CHECK_POSITION[0] && !isMulti,
                      'hover:bg-base-50 pb-4 pl-2 cursor-pointer': isMulti
                    }
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    {!isMulti ? (
                      <>
                        <div className="flex items-center">
                          {option?.image && (
                            <img
                              src={option.image}
                              alt=""
                              className="mr-3 h-6 w-6 shrink-0 rounded-full"
                            />
                          )}
                          <span
                            className={twClassNames(
                              'block truncate',
                              selected && 'font-semibold'
                            )}
                          >
                            {option.label}
                          </span>
                        </div>
                        {selected && (
                          <span
                            className={twClassNames(
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                              active ? 'text-white' : 'text-brand-600',
                              {
                                'right-0 pr-4':
                                  checkPosition === CHECK_POSITION[1] ||
                                  option?.image,
                                'left-0 pl-1.5':
                                  checkPosition === CHECK_POSITION[0]
                              }
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    ) : (
                      <Checkbox
                        data={{
                          label: option.label,
                          value: option.value
                        }}
                        border={false}
                        wrapperClass="py-0"
                        checked={selected}
                      />
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
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
