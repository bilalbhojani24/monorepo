import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader/index';
import classNames from 'classnames';
import './styles.scss';
import { BUTTON_SIZES, BUTTON_VARIANTS, BUTTON_TYPES } from './const/buttonConstants';

const Button = (props) => {
  const { buttonType, children, disabled, size, loading, onClick, variant, wrapperClassName } = props;
  const buttonRef = useRef();

  const effectiveChildren = loading && !disabled ? <Loader /> : children;

  const handleClick = (e) => {
    if (disabled) return;
    onClick(e);
  };

  return (
    <button
      type="button"
      ref={buttonRef}
      aria-disabled={disabled}
      className={classNames('inline-flex items-center font-medium border border-transparent', wrapperClassName, {
        // half rounded button
        'px-2.5 py-1.5 text-xs rounded ': size === BUTTON_SIZES[0] && buttonType === BUTTON_TYPES[0],
        'px-3 py-2 text-sm leading-4 rounded-md': size === BUTTON_SIZES[1] && buttonType === BUTTON_TYPES[0],
        'px-4 py-2 text-sm rounded-md': size === BUTTON_SIZES[2] && buttonType === BUTTON_TYPES[0],
        'px-4 py-2 text-base rounded-md': size === BUTTON_SIZES[3] && buttonType === BUTTON_TYPES[0],
        'px-6 py-3 text-base rounded-md': size === BUTTON_SIZES[4] && buttonType === BUTTON_TYPES[0],

        // icon button
        'text-sm p-1 rounded-full': size === BUTTON_SIZES[0] && buttonType === BUTTON_TYPES[1],
        'text-base p-1.5 rounded-full': size === BUTTON_SIZES[1] && buttonType === BUTTON_TYPES[1],
        'text-lg p-2 rounded-full':
          (size === BUTTON_SIZES[2] || size === BUTTON_SIZES[3]) && buttonType === BUTTON_TYPES[1],
        'text-lg p-3 rounded-full': size === BUTTON_SIZES[4] && buttonType === BUTTON_TYPES[1],

        // rounded button
        'px-3 py-1.5 text-xs rounded-full': size === BUTTON_SIZES[0] && buttonType === BUTTON_TYPES[2],
        'px-3.5 py-2 text-sm leading-4 rounded-full': size === BUTTON_SIZES[1] && buttonType === BUTTON_TYPES[2],
        'px-4 py-2 text-sm rounded-full': size === BUTTON_SIZES[2] && buttonType === BUTTON_TYPES[2],
        'px-5 py-2 text-base rounded-full': size === BUTTON_SIZES[3] && buttonType === BUTTON_TYPES[2],
        'px-6 py-3 text-base rounded-full': size === BUTTON_SIZES[4] && buttonType === BUTTON_TYPES[2],

        // primary
        'bg-brand-600 text-white shadow-sm': variant === BUTTON_VARIANTS[0] && !disabled,
        // pseudo classes
        'hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2':
          variant === BUTTON_VARIANTS[0] && !disabled,
        'bg-neutral-200 text-neutral-400 cursor-not-allowed': variant === BUTTON_VARIANTS[0] && disabled,

        // secondary
        'bg-brand-100 text-brand-700': variant === BUTTON_VARIANTS[1] && !disabled,
        // pseudo classes
        'hover:bg-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2':
          variant === BUTTON_VARIANTS[1] && !disabled,
        // disabled
        'bg-neutral-100 text-neutral-400 cursor-not-allowed': variant === BUTTON_VARIANTS[1] && disabled,

        //outline
        'border border-base-300 bg-white text-base-700 shadow-sm': variant === BUTTON_VARIANTS[2] && !disabled,
        'hover:bg-base-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2':
          variant === BUTTON_VARIANTS[2] && !disabled,

        // outline disabled
        'border-neutral-100 text-neutral-400 cursor-not-allowed': variant === BUTTON_VARIANTS[2] && disabled
      })}
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
  wrapperClassName: PropTypes.string
};

Button.defaultProps = {
  buttonType: BUTTON_TYPES[0],
  disabled: false,
  loading: false,
  onClick: () => {},
  size: BUTTON_SIZES[1],
  variant: BUTTON_VARIANTS[0],
  wrapperClassName: ''
};

export default Button;
