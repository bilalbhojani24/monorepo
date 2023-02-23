import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '../../Tooltip';
import { TooltipPropTypes } from '../../Tooltip/components/TooltipContainer';

const TooltipWrapper = ({
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
      triggerWrapperClassName={`w-full text-left ${headerTooltipProps?.triggerWrapperClassName}`}
    >
      {children}
    </Tooltip>
  );
};

TooltipWrapper.propTypes = {
  children: PropTypes.node,
  isTooltipToBeWrapped: PropTypes.bool,
  tooltipContent: PropTypes.node,
  headerTooltipProps: PropTypes.shape(TooltipPropTypes)
};

TooltipWrapper.defaultProps = {
  children: null,
  isTooltipToBeWrapped: false,
  tooltipContent: null,
  headerTooltipProps: {}
};

export default TooltipWrapper;
