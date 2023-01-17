import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { twClassNames } from '../../utils/tailwindUtils';

import {
  CHECKBOX_DESCRIPTION_VARIANT,
  CHECKBOX_POSITION_VARIANT,
} from './const/checkboxConstants';

import './styles.scss';

const Checkbox = (props) => {
  const {
    border,
    checked,
    data,
    defaultChecked,
    disabled,
    description,
    indeterminate,
    isCard,
    name,
    onChange,
    position,
    wrapperClass,
  } = props;
  const [check, setCheck] = useState(defaultChecked);

  const handleChange = (event) => {
    if (disabled) return;
    setCheck(event.target.checked);
    if (onChange) onChange(event);
  };

  return (
    <div
      className={twClassNames(
        'pt-4',
        {
          'border-t border-b border-base-200 divide-y divide-base-200 py-4':
            border && !isCard,
        },
        wrapperClass,
      )}
    >
      <div
        className={twClassNames('relative flex items-start', {
          'flex-row-reverse': position === CHECKBOX_POSITION_VARIANT.right,
          'pl-2 mb-2': isCard,
        })}
      >
        <div
          className={twClassNames('flex h-5 items-center', {
            indeterminate,
          })}
        >
          <input
            id={`${name}-${data.value}`}
            name={`${name}-${data.value}`}
            type="checkbox"
            className="border-base-300 text-brand-600 focus:ring-brand-500 h-4 w-4 rounded"
            checked={checked || check}
            onChange={(e) => handleChange(e)}
            disabled={disabled}
          />
        </div>
        <div
          className={twClassNames('min-w-0 flex-1 text-sm', {
            'ml-3': position === CHECKBOX_POSITION_VARIANT.left,
          })}
        >
          <label
            htmlFor={`${name}-${data.value}`}
            className="text-base-700 select-none font-medium"
          >
            {data.label}
          </label>
          <p
            id={`${name}-${data.value}`}
            className={twClassNames('text-base-500', {
              'inline ml-2':
                description === CHECKBOX_DESCRIPTION_VARIANT.inline,
              block: description === CHECKBOX_DESCRIPTION_VARIANT.block,
              hidden: description === CHECKBOX_DESCRIPTION_VARIANT.none,
            })}
          >
            {data.description}
          </p>
        </div>

        <span
          className={twClassNames(
            checked || check
              ? 'border border-brand-500'
              : 'border-2 border-transparent',
            'pointer-events-none absolute -inset-px rounded-lg',
            { hidden: !isCard },
          )}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

Checkbox.propTypes = {
  border: PropTypes.bool,
  checked: PropTypes.bool,
  data: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  description: PropTypes.oneOf(Object.values(CHECKBOX_DESCRIPTION_VARIANT)),
  indeterminate: PropTypes.bool,
  isCard: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  position: PropTypes.oneOf(Object.values(CHECKBOX_POSITION_VARIANT)),
  wrapperClass: PropTypes.string,
};

Checkbox.defaultProps = {
  border: true,
  checked: false,
  defaultChecked: false,
  disabled: false,
  description: CHECKBOX_DESCRIPTION_VARIANT.none,
  indeterminate: false,
  isCard: false,
  name: 'checkbox',
  onChange: () => {},
  position: CHECKBOX_POSITION_VARIANT.left,
  wrapperClass: '',
};

export default Checkbox;
