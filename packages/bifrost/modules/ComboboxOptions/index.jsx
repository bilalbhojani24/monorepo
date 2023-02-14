import React, { forwardRef, useContext } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Combobox } from '@headlessui/react';
import { oneOf } from 'prop-types';

import { ComboboxContextData } from '../../shared/comboboxContext';
import {
  number,
  oneOfType,
  shape,
  string
} from '../../shared/proptypesConstants';
import { CHECK_POSITION } from '../ComboBox/const/comboBoxConstants';
import { CheckIcon } from '../Icon';

import './styles.scss';

const ComboboxOptions = forwardRef(
  ({ option, checkPosition, wrapperClassName }, ref) => {
    const { isMulti } = useContext(ComboboxContextData);

    return (
      <Combobox.Option
        ref={ref}
        key={option.value}
        value={option}
        className={({ active }) =>
          twClassNames(
            'relative cursor-pointer select-none py-2 pl-3 pr-9',
            active && !isMulti ? 'bg-brand-600 text-white' : 'text-base-900',
            {
              'py-2 pl-3 pr-9': checkPosition === CHECK_POSITION[1] && !isMulti,
              'py-2 pl-8 pr-4': checkPosition === CHECK_POSITION[0] && !isMulti,
              'hover:bg-base-50 py-2 pl-2 cursor-pointer': isMulti
            },
            wrapperClassName
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
                          checkPosition === CHECK_POSITION[1] || option?.image,
                        'left-0 pl-1.5': checkPosition === CHECK_POSITION[0]
                      }
                    )}
                  >
                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                )}
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selected}
                  id={option.name}
                  className="border-base-300 text-brand-600 focus:ring-brand-500 h-4 w-4 cursor-pointer rounded"
                  readOnly
                />
                <label htmlFor={option.name} className="cursor-pointer">
                  {option.label}
                </label>
              </div>
            )}
          </>
        )}
      </Combobox.Option>
    );
  }
);

ComboboxOptions.propTypes = {
  checkPosition: oneOf(CHECK_POSITION),
  option: shape({
    value: oneOfType([string, number]).isRequired,
    label: string.isRequired,
    image: string
  }).isRequired,
  wrapperClassName: string
};
ComboboxOptions.defaultProps = {
  checkPosition: CHECK_POSITION[0],
  wrapperClassName: ''
};

export default ComboboxOptions;
