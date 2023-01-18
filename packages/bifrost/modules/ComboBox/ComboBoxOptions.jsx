import React from 'react';
import { Combobox } from '@headlessui/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Checkbox from '../Checkbox';
import { CheckIcon } from '../Icon';

import { CHECK_POSITION } from './const/comboBoxConstants';

const ComboBoxOptions = ({ isMulti, filteredOptions, checkPosition }) => (
  <>
    {filteredOptions.length > 0 && (
      <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
        {filteredOptions.map((option) => (
          <Combobox.Option
            key={option.value}
            value={option}
            className={({ active }) =>
              classNames(
                'relative cursor-pointer select-none py-2 pl-3 pr-9',
                active && !isMulti
                  ? 'bg-brand-600 text-white'
                  : 'text-base-900',
                {
                  'py-2 pl-3 pr-9':
                    checkPosition === CHECK_POSITION[1] && !isMulti,
                  'py-2 pl-8 pr-4':
                    checkPosition === CHECK_POSITION[0] && !isMulti,
                  'hover:bg-base-50 pb-4 pl-2 cursor-pointer': isMulti,
                },
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
                        className={classNames(
                          'block truncate',
                          selected && 'font-semibold',
                        )}
                      >
                        {option.label}
                      </span>
                    </div>
                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-brand-600',
                          {
                            'right-0 pr-4':
                              checkPosition === CHECK_POSITION[1] ||
                              option?.image,
                            'left-0 pl-1.5':
                              checkPosition === CHECK_POSITION[0],
                          },
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
  </>
);

ComboBoxOptions.propTypes = {
  isMulti: PropTypes.bool,
  checkPosition: PropTypes.string,
  filteredOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
      image: PropTypes.string,
    }),
  ),
};

ComboBoxOptions.defaultProps = {
  isMulti: false,
  checkPosition: CHECK_POSITION[0],
  filteredOptions: null,
};

export default ComboBoxOptions;
