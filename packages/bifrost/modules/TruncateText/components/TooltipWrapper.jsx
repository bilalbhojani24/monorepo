import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '../../Tooltip';
import { TooltipPropTypes } from '../../Tooltip/components/TooltipContainer';

const TooltipWrapper = ({
  ariaLabel,
  headerTooltipProps,
  tooltipContent,
  isTooltipToBeWrapped,
  children
}) => {
  if (!isTooltipToBeWrapped) return <>{children}</>;
  return (
    <Tooltip
      theme="dark"
      placementSide="bottom"
      content={tooltipContent}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...headerTooltipProps}
      triggerWrapperClassName={`w-full text-left block ${
        headerTooltipProps?.triggerWrapperClassName
          ? headerTooltipProps?.triggerWrapperClassName
          : ''
      }`}
      triggerAriaLabel={ariaLabel}
    >
      {children}
    </Tooltip>
  );
};

TooltipWrapper.propTypes = {
  ariaLabel: PropTypes.string,
  children: PropTypes.node,
  isTooltipToBeWrapped: PropTypes.bool,
  tooltipContent: PropTypes.node,
  headerTooltipProps: PropTypes.shape(TooltipPropTypes)
};

TooltipWrapper.defaultProps = {
  ariaLabel: '',
  children: null,
  isTooltipToBeWrapped: false,
  tooltipContent: null,
  headerTooltipProps: {}
};

export default TooltipWrapper;
