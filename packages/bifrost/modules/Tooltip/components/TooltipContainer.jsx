import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import PropTypes from 'prop-types';

import {
  TP_PLACEMENT_ALIGN,
  TP_PLACEMENT_SIDE,
  TP_SIZE,
  TP_TOOLTIP_THEME,
} from '../../../shared/tooltipPopoverConstants';
import { ThemeContextData } from '../../../shared/tooltipPopoverThemeContext';
import { twClassNames } from '../../../utils/tailwindUtils';

import '../styles.scss';

const TooltipContainer = (props) => {
  const {
    arrowClassName,
    children,
    content,
    delay,
    placementAlign,
    placementSide,
    size,
    theme,
  } = props;

  return (
    <ThemeContextData.Provider
      value={{
        theme,
      }}
    >
      <TooltipPrimitive.Provider delayDuration={delay} skipDelayDuration={500}>
        <TooltipPrimitive.Root>
          <TooltipPrimitive.Trigger as>{children}</TooltipPrimitive.Trigger>
          <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
              sideOffset={5}
              side={placementSide}
              align={placementAlign}
            >
              <div
                className={twClassNames('rounded-md p-4 shadow bg-white', {
                  'bg-white': theme === TP_TOOLTIP_THEME[0],
                  'bg-base-800': theme === TP_TOOLTIP_THEME[1],
                  'max-w-xs': size === TP_SIZE[0],
                  'max-w-sm': size === TP_SIZE[1],
                  'max-w-md': size === TP_SIZE[2],
                  'max-w-lg': size === TP_SIZE[3],
                })}
              >
                {content}
              </div>
              <TooltipPrimitive.Arrow
                height={10}
                width={20}
                className={twClassNames(
                  {
                    arrow: theme === TP_TOOLTIP_THEME[0],
                    'dark-arrow': theme === TP_TOOLTIP_THEME[1],
                  },
                  arrowClassName,
                )}
              />
            </TooltipPrimitive.Content>
          </TooltipPrimitive.Portal>
        </TooltipPrimitive.Root>
      </TooltipPrimitive.Provider>
    </ThemeContextData.Provider>
  );
};

TooltipContainer.propTypes = {
  arrowClassName: PropTypes.string,
  content: PropTypes.node,
  children: PropTypes.node,
  delay: PropTypes.number,
  placementAlign: PropTypes.oneOf(TP_PLACEMENT_ALIGN),
  placementSide: PropTypes.oneOf(TP_PLACEMENT_SIDE),
  size: PropTypes.oneOf(TP_SIZE),
  theme: PropTypes.oneOf(TP_TOOLTIP_THEME),
};
TooltipContainer.defaultProps = {
  arrowClassName: '',
  content: null,
  children: null,
  delay: 200,
  placementAlign: TP_PLACEMENT_ALIGN[0],
  placementSide: TP_PLACEMENT_SIDE[0],
  size: TP_SIZE[0],
  theme: TP_TOOLTIP_THEME[0],
};

export default TooltipContainer;
