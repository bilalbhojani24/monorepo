import React, { useState } from 'react';
import { Combobox } from '@headlessui/react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ChevronUpDownIcon, CheckIcon } from '../Icon';
import './styles.scss';
import { CHECK_POSITION, COMBOBOX_OPTIONS } from './const/comboBoxConstants';

const ComboBox = (props) => {
  const { checkPosition, defaultValue, label, onChange, options, isMulti, value } = props;
  const [query, setQuery] = useState('');
  const [selectOptions, setSelectedOptions] = useState(value || null);

  const filteredPeople =
    query === ''
      ? options
      : options.filter((opt) => {
          return opt.name.toLowerCase().includes(query.toLowerCase());
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
            return isMulti && Array.isArray(p) ? p?.map((p) => p.name).join(', ') : p?.name;
          }}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          {isMulti && selectOptions?.length && <span className="mr-1 font-bold">{`(${selectOptions.length})`}</span>}
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredPeople.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredPeople.map((person) => (
              <Combobox.Option
                key={person.id}
                value={person}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                    {
                      'py-2 pl-3 pr-9': checkPosition === CHECK_POSITION[1],
                      'py-2 pl-8 pr-4': checkPosition === CHECK_POSITION[0],
                    }
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex items-center">
                      {person.image && (
                        <img src={person.image} alt="" className="h-6 w-6 flex-shrink-0 rounded-full mr-3" />
                      )}
                      <span className={classNames('block truncate', selected && 'font-semibold')}>{person.name}</span>
                    </div>
                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-indigo-600',
                          {
                            'right-0 pr-4': checkPosition === CHECK_POSITION[1] || person?.image,
                            'left-0 pl-1.5': checkPosition === CHECK_POSITION[0],
                          }
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
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
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string,
      })
    ),
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }),
  ]),
  isMulti: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    })
  ).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string,
      })
    ),
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
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
