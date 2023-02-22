import React, { useLayoutEffect, useRef } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import {
  CHECKBOX_DESCRIPTION_VARIANT,
  CHECKBOX_POSITION_VARIANT
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
    icon,
    indeterminate,
    isCard,
    name,
    onChange,
    position,
    wrapperClassName
  } = props;
  const ref = useRef();

  useLayoutEffect(() => {
    if (ref) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const handleChange = (event) => {
    if (disabled) return;
    if (onChange) onChange(event);
  };

  return (
    <div
      className={twClassNames(
        'pt-0',
        {
          'border-t border-b border-base-200 divide-y divide-base-200 py-4':
            border && !isCard,
          'opacity-25 cursor-not-allowed': disabled
        },
        wrapperClassName
      )}
    >
      <div
        className={twClassNames('relative flex items-start', {
          'flex-row-reverse': position === CHECKBOX_POSITION_VARIANT.right,
          'pl-2 mb-2 py-4': isCard
        })}
      >
        <div className={twClassNames('flex h-5 items-center')}>
          <input
            ref={ref}
            id={`${name}${data?.value || ''}`}
            name={`${name}${data?.value || ''}`}
            type="checkbox"
            className={twClassNames(
              'border-base-300 text-brand-600 focus:ring-brand-500 h-4 w-4 rounded',
              {
                'cursor-not-allowed': disabled
              }
            )}
            defaultChecked={defaultChecked}
            checked={checked}
            onChange={(e) => handleChange(e)}
            disabled={disabled}
          />
        </div>
        {data ? (
          <div
            className={twClassNames('min-w-0 flex-1 text-sm', {
              'ml-3': position === CHECKBOX_POSITION_VARIANT.left
            })}
          >
            <label
              htmlFor={`${name}${data.value}`}
              className={twClassNames('text-base-700 select-none font-medium', {
                'flex flex-row items-center gap-1.5': icon,
                'cursor-not-allowed': disabled
              })}
            >
              {icon}
              {data.label}
            </label>
            <p
              id={`${name}-${data.value}`}
              className={twClassNames('text-base-500', {
                'inline ml-2':
                  description === CHECKBOX_DESCRIPTION_VARIANT.inline,
                block: description === CHECKBOX_DESCRIPTION_VARIANT.block,
                hidden: description === CHECKBOX_DESCRIPTION_VARIANT.none
              })}
            >
              {data.description}
            </p>
          </div>
        ) : null}

        <span
          className={twClassNames(
            checked || defaultChecked
              ? 'border border-brand-500'
              : 'border-2 border-transparent',
            'pointer-events-none absolute -inset-px rounded-lg',
            { hidden: !isCard }
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
    description: PropTypes.string
  }),
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  description: PropTypes.oneOf(Object.values(CHECKBOX_DESCRIPTION_VARIANT)),
  icon: PropTypes.node,
  indeterminate: PropTypes.bool,
  isCard: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  position: PropTypes.oneOf(Object.values(CHECKBOX_POSITION_VARIANT)),
  wrapperClassName: PropTypes.string
};

Checkbox.defaultProps = {
  border: true,
  checked: undefined,
  data: null,
  defaultChecked: undefined,
  disabled: false,
  description: CHECKBOX_DESCRIPTION_VARIANT.none,
  icon: null,
  indeterminate: false,
  isCard: false,
  name: 'checkbox',
  onChange: () => {},
  position: CHECKBOX_POSITION_VARIANT.left,
  wrapperClassName: ''
};

export default Checkbox;
