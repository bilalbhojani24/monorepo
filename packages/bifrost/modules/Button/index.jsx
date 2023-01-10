import React, { useRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Loader from '../Loader/index';

import {
  BUTTON_SIZES,
  BUTTON_STYLE_CLASSES,
  BUTTON_TYPES,
  BUTTON_VARIANTS,
} from './const/buttonConstants';

import './styles.scss';

const Button = ({
  buttonType,
  children,
  disabled,
  size,
  loading,
  onClick,
  variant,
  wrapperClassName,
}) => {
  const buttonRef = useRef();

  const effectiveChildren =
    loading && !disabled && variant !== BUTTON_VARIANTS[3] ? (
      <Loader />
    ) : (
      children
    );

  const handleClick = (e) => {
    if (disabled) return;
    onClick(e);
  };

  return (
    <button
      type="button"
      ref={buttonRef}
      aria-disabled={disabled}
      className={classNames(
        'border border-transparent font-medium',
        wrapperClassName,
        // {
        //   // half rounded button
        //   'rounded px-2.5 py-1.5 text-xs':
        //     size === BUTTON_SIZES[0] && buttonType === BUTTON_TYPES[0],
        //   'rounded-md px-3 py-2 text-sm leading-4':
        //     size === BUTTON_SIZES[1] && buttonType === BUTTON_TYPES[0],
        //   'rounded-md px-4 py-2 text-sm':
        //     size === BUTTON_SIZES[2] && buttonType === BUTTON_TYPES[0],
        //   'rounded-md px-4 py-2 text-base':
        //     size === BUTTON_SIZES[3] && buttonType === BUTTON_TYPES[0],
        //   'rounded-md px-6 py-3 text-base':
        //     size === BUTTON_SIZES[4] && buttonType === BUTTON_TYPES[0],

        //   // icon button
        //   'rounded-full p-1 text-sm':
        //     size === BUTTON_SIZES[0] && buttonType === BUTTON_TYPES[1],
        //   'rounded-full p-1.5 text-base':
        //     size === BUTTON_SIZES[1] && buttonType === BUTTON_TYPES[1],
        //   'rounded-full p-2 text-lg':
        //     (size === BUTTON_SIZES[2] || size === BUTTON_SIZES[3]) &&
        //     buttonType === BUTTON_TYPES[1],
        //   'rounded-full p-3 text-lg':
        //     size === BUTTON_SIZES[4] && buttonType === BUTTON_TYPES[1],

        //   // rounded button
        //   'rounded-full px-3 py-1.5 text-xs':
        //     size === BUTTON_SIZES[0] && buttonType === BUTTON_TYPES[2],
        //   'rounded-full px-3.5 py-2 text-sm leading-4':
        //     size === BUTTON_SIZES[1] && buttonType === BUTTON_TYPES[2],
        //   'rounded-full px-4 py-2 text-sm':
        //     size === BUTTON_SIZES[2] && buttonType === BUTTON_TYPES[2],
        //   'rounded-full px-5 py-2 text-base':
        //     size === BUTTON_SIZES[3] && buttonType === BUTTON_TYPES[2],
        //   'rounded-full px-6 py-3 text-base':
        //     size === BUTTON_SIZES[4] && buttonType === BUTTON_TYPES[2],

        //   // primary
        //   'bg-information-600 text-white shadow-sm':
        //     variant === BUTTON_VARIANTS[0] && !disabled,
        //   // pseudo classes
        //   'hover:bg-information-700 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2':
        //     variant === BUTTON_VARIANTS[0] && !disabled,
        //   'bg-neutral-200 text-neutral-400 cursor-not-allowed':
        //     variant === BUTTON_VARIANTS[0] && disabled,

        //   // secondary
        //   'bg-information-100 text-information-700':
        //     variant === BUTTON_VARIANTS[1] && !disabled,
        //   // pseudo classes
        //   'hover:bg-information-200 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2':
        //     variant === BUTTON_VARIANTS[1] && !disabled,
        //   // disabled
        //   'bg-neutral-100 text-neutral-400 cursor-not-allowed':
        //     variant === BUTTON_VARIANTS[1] && disabled,

        //   // outline
        //   'border border-base-300 bg-white text-base-700 shadow-sm':
        //     variant === BUTTON_VARIANTS[2] && !disabled,
        //   'hover:bg-base-50 focus:outline-none focus:ring-2 focus:ring-information-500 focus:ring-offset-2':
        //     variant === BUTTON_VARIANTS[2] && !disabled,

        //   // outline disabled
        //   'border-neutral-100 text-neutral-400 cursor-not-allowed':
        //     variant === BUTTON_VARIANTS[2] && disabled,

        //   // minimalist
        //   'bg-transparent text-base-700': BUTTON_VARIANTS[3] && !disabled,

        //   // psuedo classes
        //   'hover:text-base-500 focus:ring-2 focus:ring-information-500 focus:ring-offset-2':
        //     BUTTON_VARIANTS[3] && !disabled,

        //   // disabled
        //   'cursor-not-allowed text-base-400': BUTTON_VARIANTS[3] && disabled,
        // },
        disabled
          ? BUTTON_STYLE_CLASSES[`${size}-${variant}-${buttonType}-disabled`]
          : BUTTON_STYLE_CLASSES[`${size}-${variant}-${buttonType}`],
      )}
      onClick={handleClick}
    >
      {effectiveChildren}
    </button>
  );
};

Button.propTypes = {
  buttonType: PropTypes.oneOf(BUTTON_TYPES),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(BUTTON_SIZES),
  variant: PropTypes.oneOf(BUTTON_VARIANTS),
  wrapperClassName: PropTypes.string,
};

Button.defaultProps = {
  buttonType: BUTTON_TYPES[0],
  disabled: false,
  loading: false,
  onClick: () => {},
  size: BUTTON_SIZES[1],
  variant: BUTTON_VARIANTS[0],
  wrapperClassName: '',
  children: '',
};

export default Button;
