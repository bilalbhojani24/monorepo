import React, { forwardRef, useContext } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Combobox } from '@headlessui/react';
import { func, oneOf } from 'prop-types';

import CheckboxClone from '../../shared/CheckboxClone';
import { ComboboxContextData } from '../../shared/comboboxContext';
import {
  bool,
  node,
  number,
  oneOfType,
  shape,
  string
} from '../../shared/proptypesConstants';
import { CHECK_POSITION } from '../ComboBox/const/comboBoxConstants';
import { CheckIcon } from '../Icon';

const ComboboxOptionItem = forwardRef(
  (
    { disabled, option, checkPosition, wrapperClassName, handleImageFailure },
    ref
  ) => {
    const { isMulti, isBadge } = useContext(ComboboxContextData);

    return (
      <Combobox.Option
        ref={ref}
        key={option.value}
        value={option}
        className={({ active, selected }) =>
          twClassNames(
            'group relative cursor-pointer select-none py-2 pl-3 pr-9',
            active && !isMulti ? 'bg-brand-600 text-white' : 'text-base-900',
            {
              'py-2 pl-3 pr-9': checkPosition === CHECK_POSITION[1] && !isMulti,
              'py-2 pl-8 pr-4': checkPosition === CHECK_POSITION[0] && !isMulti,
              'hover:bg-base-50 py-2 pl-2 cursor-pointer': isMulti,
              'bg-base-50 text-base-500': disabled,
              'pl-3': isBadge && !selected
            },
            wrapperClassName
          )
        }
        disabled={disabled}
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
                      onError={handleImageFailure}
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
                    {option?.visualLabel || option.label}
                  </span>
                </div>
                {selected && !isBadge && (
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
                <CheckboxClone checked={selected} active={active} />

                <label
                  htmlFor={option.name}
                  className="cursor-pointer truncate"
                >
                  {option?.visualLabel || option.label}
                </label>
              </div>
            )}
          </>
        )}
      </Combobox.Option>
    );
  }
);

ComboboxOptionItem.propTypes = {
  checkPosition: oneOf(CHECK_POSITION),
  disabled: bool,
  option: shape({
    value: oneOfType([string, number]).isRequired,
    label: string.isRequired,
    image: string,
    visualLabel: node
  }).isRequired,
  handleImageFailure: func,
  wrapperClassName: string
};

ComboboxOptionItem.defaultProps = {
  checkPosition: CHECK_POSITION[0],
  disabled: false,
  wrapperClassName: '',
  handleImageFailure: null
};

export default ComboboxOptionItem;
