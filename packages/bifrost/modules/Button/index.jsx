import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';

import { twClassNames } from '../../utils/tailwindUtils';
import Loader from '../Loader/index';

import {
  BUTTON_COLORS,
  BUTTON_ICON_PLACEMENT,
  BUTTON_SIZES,
  BUTTON_STYLE_CLASSES,
  BUTTON_VARIANTS
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
  isIconOnlyButton,
  colors
}) => {
  const buttonRef = useRef();

  const effectiveChildren =
    loading && !disabled && variant !== BUTTON_VARIANTS[3] ? (
      <Loader
        wrapperStyle="mx-auto"
        height={
          size === BUTTON_SIZES[0] || size === BUTTON_SIZES[1] ? 'h-4' : 'h-5'
        }
        width={
          size === BUTTON_SIZES[0] || size === BUTTON_SIZES[1] ? 'h-4' : 'h-5'
        }
      />
    ) : (
      <span
        className={twClassNames({
          'mx-auto grid w-fit items-center gap-2.5': icon !== null,
          'grid-cols-[16px,2fr]':
            iconPlacement === BUTTON_ICON_PLACEMENT[0] && icon !== null,
          'grid-cols-[2fr,16px]':
            iconPlacement === BUTTON_ICON_PLACEMENT[1] && icon !== null,
          'gap-0': isIconOnlyButton
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

  const buttonDimensions = useMemo(() => {
    if (loading) {
      return {
        width: buttonRef?.current?.getBoundingClientRect()?.width,
        height: buttonRef?.current?.getBoundingClientRect()?.height
      };
    }

    return null;
  }, [loading]);

  const stylePicker = () => {
    if (disabled) {
      return BUTTON_STYLE_CLASSES[`${size}-${colors}-${variant}-disabled`];
    }

    if (loading) {
      return BUTTON_STYLE_CLASSES[`${size}-${colors}-${variant}-loading`];
    }

    return BUTTON_STYLE_CLASSES[`${size}-${colors}-${variant}`];
  };

  return (
    <button
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...(buttonDimensions && {
        style: {
          width: buttonDimensions.width,
          height: buttonDimensions.height
        }
      })}
      type="button"
      ref={buttonRef}
      aria-disabled={disabled}
      className={twClassNames(
        'border border-transparent font-medium',
        stylePicker(),
        {
          'w-full': fullWidth === true
        },
        wrapperClassName
      )}
      onClick={handleClick}
    >
      {effectiveChildren}
    </button>
  );
};

Button.propTypes = {
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
  isIconOnlyButton: PropTypes.bool
};

Button.defaultProps = {
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
  isIconOnlyButton: true
};

export default Button;
