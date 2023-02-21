import React from 'react';
import { twClassNames } from '@browserstack/utils';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
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

const TooltipContainer = (props) => {
  const {
    arrowClassName,
    arrowWidth,
    arrowHeight,
    arrowPadding,
    alignOffset,
    avoidCollisions,
    children,
    content,
    delay,
    defaultOpen,
    onEscapeKeyDown,
    onPointerDownOutside,
    onOpenChange,
    placementAlign,
    placementSide,
    size,
    show,
    sideOffset,
    sticky,
    theme,
    wrapperClassName
  } = props;

  return (
    <ThemeContextData.Provider
      value={{
        theme
      }}
    >
      <TooltipPrimitive.Provider delayDuration={delay} skipDelayDuration={500}>
        <TooltipPrimitive.Root
          open={show}
          defaultOpen={defaultOpen}
          onOpenChange={onOpenChange}
        >
          <TooltipPrimitive.Trigger>{children}</TooltipPrimitive.Trigger>
          <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
              alignOffset={alignOffset}
              avoidCollisions={avoidCollisions}
              arrowPadding={arrowPadding}
              side={placementSide}
              align={placementAlign}
              onEscapeKeyDown={onEscapeKeyDown}
              onPointerDownOutside={onPointerDownOutside}
              sideOffset={sideOffset}
              sticky={sticky}
              className={twClassNames(
                'z-50 rounded-md shadow bg-white py-4',
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
              <TooltipPrimitive.Arrow
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
            </TooltipPrimitive.Content>
          </TooltipPrimitive.Portal>
        </TooltipPrimitive.Root>
      </TooltipPrimitive.Provider>
    </ThemeContextData.Provider>
  );
};

export const TooltipPropTypes = {
  arrowClassName: PropTypes.string,
  arrowWidth: PropTypes.number,
  arrowHeight: PropTypes.number,
  arrowPadding: PropTypes.number,
  alignOffset: PropTypes.number,
  avoidCollisions: PropTypes.bool,
  content: PropTypes.node,
  children: PropTypes.node,
  delay: PropTypes.number,
  defaultOpen: PropTypes.bool,
  onEscapeKeyDown: PropTypes.func,
  onPointerDownOutside: PropTypes.func,
  onOpenChange: PropTypes.func,
  placementAlign: PropTypes.oneOf(TP_PLACEMENT_ALIGN),
  placementSide: PropTypes.oneOf(TP_PLACEMENT_SIDE),
  size: PropTypes.oneOf(TP_SIZE),
  sideOffset: PropTypes.number,
  sticky: PropTypes.oneOf(TP_STICKY_OPTIONS),
  show: PropTypes.bool,
  theme: PropTypes.oneOf(TP_TOOLTIP_THEME),
  wrapperClassName: PropTypes.string
};

TooltipContainer.propTypes = TooltipPropTypes;
TooltipContainer.defaultProps = {
  arrowClassName: '',
  arrowWidth: 20,
  arrowHeight: 10,
  arrowPadding: 0,
  alignOffset: 0,
  avoidCollisions: true,
  content: null,
  children: null,
  delay: 200,
  defaultOpen: undefined,
  onEscapeKeyDown: null,
  onPointerDownOutside: null,
  onOpenChange: null,
  placementAlign: TP_PLACEMENT_ALIGN[0],
  placementSide: TP_PLACEMENT_SIDE[0],
  size: TP_SIZE[0],
  show: undefined,
  sideOffset: 5,
  sticky: TP_STICKY_OPTIONS[0],
  theme: TP_TOOLTIP_THEME[0],
  wrapperClassName: ''
};

export default TooltipContainer;
