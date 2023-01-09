import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss';

const Radio = (props) => {
  const { id, isChecked, name, description, disabled, onChange } = props;

  const handleChange = (e) => {
    if (disabled) return;
    onChange(e, id);
  };

  return (
    <div
      className={classNames('inline-flex item-center mr-3', {
        'cursor-not-allowed': disabled
      })}
    >
      <input
        id={id}
        aria-describedby={`${id}-description`}
        name={name}
        type="radio"
        disabled={disabled}
        checked={isChecked}
        className={classNames('h-4 w-4 border-base-300 text-brand-600 focus:ring-brand-500 mt-0.5', {
          'border-base-200 text-base-200': disabled
        })}
        onChange={handleChange}
      />

      <div className="ml-3 text-sm">
        {name && (
          <label
            htmlFor={id}
            className={classNames('font-medium text-base-700', {
              'text-base-400': disabled
            })}
          >
            {name}
          </label>
        )}
        {description && (
          <p
            id={`${id}-description`}
            className={classNames('text-base-500', {
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
  id: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func
};
Radio.defaultProps = {
  id: 'radio',
  isChecked: true,
  description: 'It is the description',
  disabled: false,
  name: 'Name',
  onChange: () => {}
};

export default Radio;
