import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const Radio = (props) => {
  const { id, checked, defaultChecked, name, description, disabled, onChange } =
    props;

  const handleChange = (e) => {
    if (disabled) return;
    onChange(e);
  };

  return (
    <div
      className={twClassNames('inline-flex item-center mr-3', {
        'cursor-not-allowed': disabled
      })}
    >
      <input
        id={id}
        aria-describedby={`${id}-description`}
        name={name}
        type="radio"
        disabled={disabled}
        checked={checked}
        defaultChecked={defaultChecked}
        className={twClassNames(
          'h-4 w-4 border-base-300 text-brand-600 focus:ring-brand-500 mt-0.5',
          {
            'border-base-200 text-base-200': disabled
          }
        )}
        onChange={handleChange}
      />

      <div className="ml-3 text-sm">
        {name && (
          <label
            htmlFor={id}
            className={twClassNames('font-medium text-base-700', {
              'text-base-400': disabled
            })}
          >
            {name}
          </label>
        )}
        {description && (
          <p
            id={`${id}-description`}
            className={twClassNames('text-base-500', {
              'text-base-300': disabled
            })}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

Radio.propTypes = {
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func
};
Radio.defaultProps = {
  checked: undefined,
  defaultChecked: undefined,
  description: 'It is the description',
  disabled: false,
  name: 'Name',
  onChange: null
};

export default Radio;
