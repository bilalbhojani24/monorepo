import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Popover from '../../Popover';
import Tooltip from '../../Tooltip';

import RenderAccessibleChild from './RenderAccessibleChild';

const AccessibleTooltip = ({ children, content }) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return (
    <div className="relative">
      {!isPopoverOpen && (
        <Tooltip
          arrowClassName="w-4 h-2"
          content={
            <RenderAccessibleChild isPopoverOpen={isPopoverOpen}>
              {content}
            </RenderAccessibleChild>
          }
          theme="light"
          placementSide="bottom"
          size="5xl"
          wrapperClassName="py-0 block"
          triggerOnTouch
          triggerAriaLabel="product popover"
          triggerWrapperClassName="block"
          sideOffset={35}
          onOpenChange={(o) => setIsTooltipOpen(o)}
          disabled={isPopoverOpen}
          triggerAsChild
        >
          <section className="absolute h-full w-full" />
        </Tooltip>
      )}
      <Popover
        arrowClassName="w-4 h-2"
        content={
          <RenderAccessibleChild isPopoverOpen={isPopoverOpen}>
            {content}
          </RenderAccessibleChild>
        }
        theme="light"
        placementSide="bottom"
        size="5xl"
        wrapperClassName="py-0"
        sideOffset={-5}
        onOpenChange={(o) => setIsPopoverOpen(o)}
        disabled={isTooltipOpen}
      >
        {children}
      </Popover>
    </div>
  );
};

AccessibleTooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired
};

export default AccessibleTooltip;
