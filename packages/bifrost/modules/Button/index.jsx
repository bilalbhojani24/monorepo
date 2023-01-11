import React, { useRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Loader from '../Loader/index';

import {
  BUTTON_COLORS,
  BUTTON_ICON_PLACEMENT,
  BUTTON_SIZES,
  BUTTON_STYLE_CLASSES,
  BUTTON_VARIANTS,
} from './const/buttonConstants';

import './styles.scss';

const Button = ({
  children,
  disabled,
  size,
  loading,
  onClick,
  variant,
  wrapperClassName,
  fullWidth,
  icon,
  iconPlacement,
  colors,
}) => {
  const buttonRef = useRef();

  const effectiveChildren =
    loading && !disabled && variant !== BUTTON_VARIANTS[3] ? (
      <Loader />
    ) : (
      <span
        className={classNames({
          'mx-auto grid w-fit items-center gap-2.5': icon !== null,
          'grid-cols-[16px,2fr]':
            iconPlacement === BUTTON_ICON_PLACEMENT[0] && icon !== null,
          'grid-cols-[2fr,16px]':
            iconPlacement === BUTTON_ICON_PLACEMENT[1] && icon !== null,
        })}
      >
        {iconPlacement === BUTTON_ICON_PLACEMENT[0] && icon}
        {children}
        {iconPlacement === BUTTON_ICON_PLACEMENT[1] && icon}
      </span>
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
        disabled
          ? BUTTON_STYLE_CLASSES[`${size}-${colors}-${variant}-disabled`]
          : BUTTON_STYLE_CLASSES[`${size}-${colors}-${variant}`],
        loading === true
          ? BUTTON_STYLE_CLASSES[`${size}-${colors}-${variant}`]
          : null,
        {
          'w-full': fullWidth === true,
        },
      )}
      onClick={handleClick}
    >
      {effectiveChildren}
    </button>
  );
};

Button.propTypes = {
  // buttonFormat: PropTypes.oneOf(BUTTON_FORMAT),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(BUTTON_SIZES),
  variant: PropTypes.oneOf(BUTTON_VARIANTS),
  wrapperClassName: PropTypes.string,
  fullWidth: PropTypes.bool,
  icon: PropTypes.node,
  iconPlacement: PropTypes.string,
  colors: PropTypes.oneOf(BUTTON_COLORS),
};

Button.defaultProps = {
  // buttonFormat: BUTTON_FORMAT[0],
  disabled: false,
  loading: false,
  onClick: () => {},
  size: BUTTON_SIZES[1],
  variant: BUTTON_VARIANTS[0],
  wrapperClassName: '',
  children: '',
  fullWidth: false,
  icon: null,
  iconPlacement: BUTTON_ICON_PLACEMENT[0],
  colors: BUTTON_COLORS[0],
};

export default Button;
