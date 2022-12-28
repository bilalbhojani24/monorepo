import React, { useState } from 'react';
import { Combobox } from '@headlessui/react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ChevronUpDownIcon, CheckIcon } from '../Icon';
import './styles.scss';
import { CHECK_POSITION, COMBOBOX_OPTIONS } from './const/comboBoxConstants';
import Checkbox from '../Checkbox';

const ComboBox = (props) => {
  const { checkPosition, defaultValue, label, onChange, options, isMulti, value } = props;
  const [query, setQuery] = useState('');
  const [selectOptions, setSelectedOptions] = useState(value || null);

  const filteredPeople =
    query === ''
      ? options
      : options.filter((opt) => {
          return opt.label.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      as="div"
      {...(value && { value: selectOptions })}
      onChange={(value) => {
        setSelectedOptions(value);
        if (onChange) onChange(value);
      }}
      multiple={isMulti}
      {...(defaultValue && { defaultValue })}
    >
      <Combobox.Label className="block text-sm font-medium text-gray-700">{label}</Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(p) => {
            return isMulti && Array.isArray(p) ? p?.map((p) => p.label).join(', ') : p?.label;
          }}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          {isMulti && selectOptions?.length ? (
            <span className="mr-1 font-bold">{`(${selectOptions.length})`}</span>
          ) : null}
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredPeople.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredPeople.map((option) => (
              <Combobox.Option
                key={option.value}
                value={option}
                className={({ active }) =>
                  classNames(
                    'relative cursor-pointer select-none py-2 pl-3 pr-9',
                    active && !isMulti ? 'bg-indigo-600 text-white' : 'text-gray-900',
                    {
                      'py-2 pl-3 pr-9': checkPosition === CHECK_POSITION[1] && !isMulti,
                      'py-2 pl-8 pr-4': checkPosition === CHECK_POSITION[0] && !isMulti,
                      'hover:bg-gray-50 pb-4 pl-2 cursor-pointer': isMulti,
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
                            <img src={option.image} alt="" className="h-6 w-6 flex-shrink-0 rounded-full mr-3" />
                          )}
                          <span className={classNames('block truncate', selected && 'font-semibold')}>
                            {option.label}
                          </span>
                        </div>
                        {selected && (
                          <span
                            className={classNames(
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                              active ? 'text-white' : 'text-indigo-600',
                              {
                                'right-0 pr-4': checkPosition === CHECK_POSITION[1] || option?.image,
                                'left-0 pl-1.5': checkPosition === CHECK_POSITION[0],
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
                          value: option.value,
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
  checkPosition: PropTypes.string,
  defaultValue: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        label: PropTypes.string.isRequired,
        image: PropTypes.string,
      })
    ),
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
      image: PropTypes.string,
    }),
  ]),
  isMulti: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
      image: PropTypes.string,
    })
  ).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        label: PropTypes.string.isRequired,
        image: PropTypes.string,
      })
    ),
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
      image: PropTypes.string,
    }),
  ]),
};
ComboBox.defaultProps = {
  checkPosition: CHECK_POSITION[0],
  defaultValue: null,
  isMulti: false,
  label: 'Assigned to',
  onChange: () => {},
  options: COMBOBOX_OPTIONS,
  value: null,
};

export default ComboBox;
