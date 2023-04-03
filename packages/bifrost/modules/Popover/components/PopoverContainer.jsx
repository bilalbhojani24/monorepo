import React from 'react';
import { twClassNames } from '@browserstack/utils';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import PropTypes from 'prop-types';

import {
  TP_PLACEMENT_ALIGN,
  TP_PLACEMENT_SIDE,
  TP_SIZE,
  TP_STICKY_OPTIONS,
  TP_TOOLTIP_THEME
} from '../../../shared/tooltipPopoverConstants';
import { ThemeContextData } from '../../../shared/tooltipPopoverThemeContext';

import '../styles.scss';

const PopoverContainer = (props) => {
  const {
    arrowClassName,
    arrowHeight,
    arrowWidth,
    arrowPadding,
    alignOffset,
    avoidCollisions,
    children,
    content,
    defaultOpen,
    disabled,
    hideWhenDetached,
    forceMount,
    modal,
    onOpenChange,
    onOpenAutoFocus,
    onCloseAutoFocus,
    onEscapeKeyDown,
    onPointerDownOutside,
    onFocusOutside,
    onInteractOutside,
    placementAlign,
    placementSide,
    show,
    size,
    sideOffset,
    sticky,
    theme,
    triggerWrapperClassName,
    wrapperClassName
  } = props;

  return (
    <ThemeContextData.Provider
      value={{
        theme
      }}
    >
      <PopoverPrimitive.Root
        open={show}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        modal={modal}
      >
        <PopoverPrimitive.Trigger
          className={triggerWrapperClassName}
          disabled={disabled}
        >
          {children}
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align={placementAlign}
            alignOffset={alignOffset}
            arrowPadding={arrowPadding}
            avoidCollisions={avoidCollisions}
            forceMount={forceMount}
            hideWhenDetached={hideWhenDetached}
            onOpenAutoFocus={onOpenAutoFocus}
            onCloseAutoFocus={onCloseAutoFocus}
            onEscapeKeyDown={onEscapeKeyDown}
            onPointerDownOutside={onPointerDownOutside}
            onFocusOutside={onFocusOutside}
            onInteractOutside={onInteractOutside}
            sideOffset={sideOffset}
            side={placementSide}
            sticky={sticky}
            className={twClassNames(
              'z-50 rounded-md shadow bg-white py-4 space-y-2',
              {
                'bg-white': theme === TP_TOOLTIP_THEME[0],
                'bg-base-800': theme === TP_TOOLTIP_THEME[1],
                'max-w-xs': TP_SIZE[0] === size,
                'sm:max-w-sm': TP_SIZE[1] === size,
                'sm:max-w-md': TP_SIZE[2] === size,
                'sm:max-w-lg': TP_SIZE[3] === size,
                'sm:max-w-xl': TP_SIZE[4] === size,
                'sm:max-w-2xl': TP_SIZE[5] === size,
                'sm:max-w-3xl': TP_SIZE[6] === size,
                'sm:max-w-4xl': TP_SIZE[7] === size,
                'sm:max-w-5xl': TP_SIZE[8] === size,
                'sm:max-w-6xl': TP_SIZE[9] === size,
                'sm:max-w-full': TP_SIZE[10] === size
              },
              wrapperClassName
            )}
          >
            {content}
            <div className="!m-0">
              <PopoverPrimitive.Arrow
                height={arrowHeight}
                width={arrowWidth}
                className={twClassNames(
                  {
                    'drop-shadow-sm fill-white': theme === TP_TOOLTIP_THEME[0],
                    'drop-shadow-sm fill-base-800':
                      theme === TP_TOOLTIP_THEME[1]
                  },
                  arrowClassName
                )}
              />
            </div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    </ThemeContextData.Provider>
  );
};

PopoverContainer.propTypes = {
  arrowClassName: PropTypes.string,
  arrowWidth: PropTypes.number,
  arrowHeight: PropTypes.number,
  arrowPadding: PropTypes.number,
  alignOffset: PropTypes.number,
  avoidCollisions: PropTypes.bool,
  content: PropTypes.node,
  children: PropTypes.node,
  defaultOpen: PropTypes.bool,
  disabled: PropTypes.bool,
  forceMount: PropTypes.bool,
  hideWhenDetached: PropTypes.bool,
  modal: PropTypes.bool,
  onOpenChange: PropTypes.func,
  onOpenAutoFocus: PropTypes.func,
  onCloseAutoFocus: PropTypes.func,
  onEscapeKeyDown: PropTypes.func,
  onPointerDownOutside: PropTypes.func,
  onFocusOutside: PropTypes.func,
  onInteractOutside: PropTypes.func,
  placementAlign: PropTypes.oneOf(TP_PLACEMENT_ALIGN),
  placementSide: PropTypes.oneOf(TP_PLACEMENT_SIDE),
  show: PropTypes.bool,
  sideOffset: PropTypes.number,
  size: PropTypes.oneOf(TP_SIZE),
  sticky: PropTypes.oneOf(TP_STICKY_OPTIONS),
  theme: PropTypes.oneOf(TP_TOOLTIP_THEME),
  triggerWrapperClassName: PropTypes.string,
  wrapperClassName: PropTypes.string
};
PopoverContainer.defaultProps = {
  arrowClassName: '',
  arrowWidth: 20,
  arrowHeight: 10,
  arrowPadding: 0,
  alignOffset: 0,
  avoidCollisions: true,
  content: null,
  children: null,
  defaultOpen: undefined,
  disabled: false,
  forceMount: undefined,
  hideWhenDetached: false,
  modal: false,
  onOpenChange: null,
  onOpenAutoFocus: null,
  onCloseAutoFocus: null,
  onEscapeKeyDown: null,
  onPointerDownOutside: null,
  onFocusOutside: null,
  onInteractOutside: null,
  placementAlign: TP_PLACEMENT_ALIGN[0],
  placementSide: TP_PLACEMENT_SIDE[0],
  show: undefined,
  sideOffset: 5,
  size: TP_SIZE[0],
  sticky: TP_STICKY_OPTIONS[0],
  theme: TP_TOOLTIP_THEME[0],
  triggerWrapperClassName: '',
  wrapperClassName: ''
};

export default PopoverContainer;
