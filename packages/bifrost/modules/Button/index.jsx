/* eslint-disable sonarjs/cognitive-complexity */
import React, { forwardRef, useMemo, useRef } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import Loader from '../Loader/index';

import {
  BUTTON_COLORS,
  BUTTON_ICON_PLACEMENT,
  BUTTON_LOADER_CLASSES,
  BUTTON_SIZES,
  BUTTON_STYLE_CLASSES,
  BUTTON_TYPES,
  BUTTON_VARIANTS
} from './const/buttonConstants';

import './styles.scss';

const Button = (
  {
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
    colors,
    loaderText,
    ariaLabel,
    type,
    form,
    ...props
  },
  ref
) => {
  const smallButtons = (buttonSize) => {
    let flag = false;
    if (buttonSize === BUTTON_SIZES[0] || buttonSize === BUTTON_SIZES[1])
      flag = true;

    return flag;
  };

  const largeButtons = (buttonSize) => {
    let flag = false;

    if (
      buttonSize === BUTTON_SIZES[2] ||
      buttonSize === BUTTON_SIZES[3] ||
      buttonSize === BUTTON_SIZES[4]
    )
      flag = true;

    return flag;
  };

  const effectiveChildrenClasses = twClassNames({
    'flex items-center justify-center gap-2.5 mx-auto': loading,
    'mx-auto grid w-fit items-center gap-2.5': icon !== null,
    'grid-cols-[16px,2fr]':
      iconPlacement === BUTTON_ICON_PLACEMENT[0] &&
      icon !== null &&
      smallButtons(size),
    'grid-cols-[20px,2fr]':
      iconPlacement === BUTTON_ICON_PLACEMENT[0] &&
      icon !== null &&
      largeButtons(size),
    'grid-cols-[2fr,16px]':
      iconPlacement === BUTTON_ICON_PLACEMENT[1] &&
      icon !== null &&
      smallButtons(size),
    'grid-cols-[2fr,20px]':
      iconPlacement === BUTTON_ICON_PLACEMENT[1] &&
      icon !== null &&
      largeButtons(size),
    'gap-0 grid-cols-auto': isIconOnlyButton,
    'h-5 w-5':
      (size === BUTTON_SIZES[0] ||
        size === BUTTON_SIZES[1] ||
        size === BUTTON_SIZES[2]) &&
      isIconOnlyButton,
    'h-6 w-6':
      (size === BUTTON_SIZES[3] || size === BUTTON_SIZES[4]) && isIconOnlyButton
  });

  const buttonRef = useRef();

  const effectiveChildren =
    loading && !disabled && variant !== BUTTON_VARIANTS[3] ? (
      <span className={effectiveChildrenClasses}>
        {iconPlacement === BUTTON_ICON_PLACEMENT[0] && (
          <Loader
            wrapperClassName={`mx-auto ${
              BUTTON_LOADER_CLASSES[`${colors}-${variant}`]
            }`}
            height={smallButtons(size) ? 'h-4' : 'h-5'}
            width={smallButtons(size) ? 'h-4' : 'h-5'}
          />
        )}
        {isIconOnlyButton === false && loaderText}
        {iconPlacement === BUTTON_ICON_PLACEMENT[1] && (
          <Loader
            wrapperClassName={`mx-auto ${
              BUTTON_LOADER_CLASSES[`${colors}-${variant}`]
            }`}
            height={smallButtons(size) ? 'h-4' : 'h-5'}
            width={smallButtons(size) ? 'h-4' : 'h-5'}
          />
        )}
      </span>
    ) : (
      <span className={effectiveChildrenClasses}>
        {iconPlacement === BUTTON_ICON_PLACEMENT[0] && icon}
        {children}
        {iconPlacement === BUTTON_ICON_PLACEMENT[1] && icon}
      </span>
    );

  const getIconOnlyBtnStyle = () => {
    let result = '';
    if (isIconOnlyButton) {
      switch (size) {
        case BUTTON_SIZES[0]:
          result = 'p-[4px]';
          break;
        case BUTTON_SIZES[1]:
          result = 'p-[6px]';
          break;
        case BUTTON_SIZES[2]:
          result = 'p-[8px]';
          break;
        case BUTTON_SIZES[3]:
          result = 'p-[8px]';
          break;
        case BUTTON_SIZES[4]:
          result = 'p-[12px]';
          break;
        default:
          break;
      }
    }
    return result;
  };

  const handleClick = (e) => {
    if (disabled || loading) return;
    onClick(e);
  };

  const buttonDimensions = useMemo(() => {
    if (loading && !fullWidth && isIconOnlyButton) {
      const target = ref || buttonRef;
      return {
        width: target?.current?.getBoundingClientRect()?.width,
        height: target?.current?.getBoundingClientRect()?.height
      };
    }

    return null;
  }, [loading, ref, fullWidth, isIconOnlyButton]);

  const stylePicker = () => {
    if (disabled) {
      return BUTTON_STYLE_CLASSES[`${size}-${colors}-${variant}-disabled`];
    }

    if (loading) {
      return BUTTON_STYLE_CLASSES[`${size}-${colors}-${variant}-loading`];
    }

    return BUTTON_STYLE_CLASSES[`${size}-${colors}-${variant}`];
  };

  const getConditionalProps = () => {
    const conditionalProps = {};
    if (buttonDimensions) {
      conditionalProps.style = {
        width: buttonDimensions.width,
        height: buttonDimensions.height
      };
    }
    if (ariaLabel.length > 0) {
      conditionalProps['aria-label'] = ariaLabel;
    }
    return conditionalProps;
  };

  return (
    <button
      {...props}
      {...getConditionalProps()}
      type={type === 'submit' ? 'submit' : 'button'}
      ref={ref || buttonRef}
      aria-disabled={disabled}
      onClick={handleClick}
      form={form}
      className={twClassNames(
        'border border-transparent font-medium',
        stylePicker(),
        {
          'w-full': fullWidth === true
        },
        getIconOnlyBtnStyle(),
        wrapperClassName
      )}
    >
      {effectiveChildren}
    </button>
  );
};

const buttonProps = {
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
  isIconOnlyButton: PropTypes.bool,
  ariaLabel: PropTypes.string,
  loaderText: PropTypes.string,
  type: PropTypes.oneOf(BUTTON_TYPES),
  form: PropTypes.string
};

const defaultProps = {
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
  isIconOnlyButton: false,
  ariaLabel: '',
  loaderText: 'Loading',
  type: 'button',
  form: null
};

const WrappedButton = forwardRef(Button);

Button.propTypes = buttonProps;
WrappedButton.propTypes = buttonProps;

Button.defaultProps = defaultProps;
WrappedButton.defaultProps = defaultProps;

export default WrappedButton;
