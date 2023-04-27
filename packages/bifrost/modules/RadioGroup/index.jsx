import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { DIRECTIONS } from './const/radioGroupConstants';

const RadioGroup = (props) => {
  const {
    direction,
    selectedOption,
    options,
    onChange,
    inlineDescription,
    rightAligned
  } = props;

  const handleChange = (id) => (e) => {
    onChange(e, id);
  };

  return (
    <div
      className={twClassNames('flex', {
        'space-x-5': direction === DIRECTIONS[0],
        'space-y-5 flex-col': direction === DIRECTIONS[1]
      })}
    >
      {options.map((option) => (
        <div
          key={option.id}
          className={twClassNames('flex items-start', {
            'cursor-not-allowed': option.disabled
          })}
        >
          <div
            className={twClassNames('flex h-5 items-center', {
              'order-last mx-3': rightAligned,
              'cursor-not-allowed': option.disabled
            })}
          >
            <input
              id={option.id}
              aria-describedby={`${option.id}-description`}
              name="plan"
              type="radio"
              disabled={option.disabled}
              checked={option.id === selectedOption?.id}
              className="border-base-300 text-brand-600 focus:ring-brand-500 h-4 w-4"
              onChange={handleChange(option.id)}
            />
          </div>
          <div
            className={twClassNames(
              { 'flex-col': !inlineDescription, 'flex-1': rightAligned },
              'flex ml-3 text-sm'
            )}
          >
            {option.name && (
              <label
                htmlFor={option.id}
                className={twClassNames('text-base-700 font-medium', {
                  'text-base-600': option.disabled,
                  'cursor-not-allowed': option.disabled
                })}
              >
                {option.name}
              </label>
            )}
            {option.description && (
              <div
                id={`${option.id}-description`}
                className={twClassNames(
                  { 'ml-2': inlineDescription },
                  'text-base-500',
                  {
                    'text-base-500': option.disabled
                  }
                )}
              >
                {option.description}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

RadioGroup.propTypes = {
  direction: PropTypes.oneOf(DIRECTIONS),
  selectedOption: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    disabled: PropTypes.bool
  }),
  inlineDescription: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      description: PropTypes.string,
      disabled: PropTypes.bool
    })
  ),
  onChange: PropTypes.func,
  rightAligned: PropTypes.bool
};
RadioGroup.defaultProps = {
  direction: DIRECTIONS[0],
  selectedOption: null,
  inlineDescription: false,
  options: [],
  onChange: () => {},
  rightAligned: false
};

export default RadioGroup;
