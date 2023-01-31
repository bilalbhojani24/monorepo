import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { DIRECTIONS } from './const/radioGroupConstants';

import './styles.scss';

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
      className={classNames('flex', {
        'space-x-5': direction === DIRECTIONS[0],
        'space-y-5 flex-col': direction === DIRECTIONS[1]
      })}
    >
      {options.map((option) => (
        <div key={option.id} className="flex items-start">
          <div
            className={classNames('flex h-5 items-center', {
              'order-last mx-3': rightAligned
            })}
          >
            <input
              id={option.id}
              aria-describedby={`${option.id}-description`}
              name="plan"
              type="radio"
              checked={option.id === selectedOption?.id}
              className="border-base-300 text-brand-600 focus:ring-brand-500 h-4 w-4"
              onChange={handleChange(option.id)}
            />
          </div>
          <div
            className={classNames(
              { 'flex-col': !inlineDescription, 'flex-1': rightAligned },
              'flex ml-3 text-sm'
            )}
          >
            {option.name && (
              <label htmlFor={option.id} className="text-base-700 font-medium">
                {option.name}
              </label>
            )}
            {option.description && (
              <div
                id={`${option.id}-description`}
                className={classNames(
                  { 'ml-2': inlineDescription },
                  'text-base-500'
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
