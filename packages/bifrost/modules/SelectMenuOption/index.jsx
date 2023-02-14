import React, { useContext } from 'react';
import { twClassNames } from '@browserstack/utils';
import { Listbox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';

import {
  number,
  oneOf,
  oneOfType,
  shape,
  string
} from '../../shared/proptypesConstants';
import { SelectMenuContextData } from '../../shared/selectMenuContext';
import { CHECK_POSITION } from '../SelectMenu/const/selectMenuConstants';

import './styles.scss';

const SelectMenuOption = ({ checkPosition, option, wrapperClassName }) => {
  const selectMenuCtx = useContext(SelectMenuContextData);

  return (
    <Listbox.Option
      key={option.value}
      className={({ active }) =>
        twClassNames(
          {
            'bg-brand-600 text-white': active && !selectMenuCtx.isMulti,
            'text-base-900': !active,
            'py-2 pl-3 pr-9':
              checkPosition === CHECK_POSITION[1] && !selectMenuCtx.isMulti,
            'py-2 pl-8 pr-4':
              checkPosition === CHECK_POSITION[0] && !selectMenuCtx.isMulti,
            'py-2 pl-3 hover:bg-base-50': selectMenuCtx.isMulti
          },
          'relative cursor-pointer select-none',
          wrapperClassName
        )
      }
      value={option}
    >
      {({ active, selected }) => (
        <>
          {!selectMenuCtx.isMulti ? (
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
                      'right-0 pr-4': checkPosition === CHECK_POSITION[1],
                      'left-0 pl-1.5': checkPosition === CHECK_POSITION[0]
                    },
                    'absolute inset-y-0 flex items-center'
                  )}
                >
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                </span>
              )}
            </div>
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
    </Listbox.Option>
  );
};

SelectMenuOption.propTypes = {
  checkPosition: oneOf(CHECK_POSITION),
  option: shape({
    value: oneOfType([number, string]),
    label: string,
    image: string
  }).isRequired,
  wrapperClassName: string
};
SelectMenuOption.defaultProps = {
  checkPosition: CHECK_POSITION[0],
  wrapperClassName: ''
};

export default SelectMenuOption;
