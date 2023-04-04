import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Popover from '../../Popover';
import Tooltip from '../../Tooltip';

import RenderAccessibleChild from './RenderAccessibleChild';

const AccessibleTooltip = ({ children, content }) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);

  return (
    <div className="relative">
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
        onOpenChange={(o) => setIsPopoverOpen(o)}
        disabled={isTooltipOpen}
        triggerAsChild
        triggerWrapperClassName="block"
      >
        <button
          type="button"
          className="absolute block h-full w-full"
          onClick={() => {
            setIsMouseOver(false);
          }}
          onMouseEnter={() => {
            setIsMouseOver(true);
          }}
          style={{
            pointerEvents: isMouseOver ? 'none' : 'auto'
          }}
          aria-label="popover button"
        />
      </Popover>

      {!isPopoverOpen ? (
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
          wrapperClassName="py-0"
          triggerOnTouch
          triggerWrapperClassName="block"
          onOpenChange={(o) => setIsTooltipOpen(o)}
          triggerAsChild
          onMouseLeave={() => {
            setIsMouseOver(false);
          }}
        >
          {children}
        </Tooltip>
      ) : (
        children
      )}
    </div>
  );
};

AccessibleTooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired
};

export default AccessibleTooltip;
