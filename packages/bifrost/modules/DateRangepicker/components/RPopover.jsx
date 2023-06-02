import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import Proptypes from 'prop-types';

const RPopover = ({
  trigger,
  content,
  sideOffset,
  alignOffset,
  align,
  side
}) => (
  <Popover.Root defaultOpen={false}>
    <Popover.Trigger asChild>{trigger}</Popover.Trigger>
    <Popover.Portal>
      <Popover.Content
        align={align}
        side={side}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
      >
        {content}
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);

RPopover.propTypes = {
  trigger: Proptypes.node.isRequired,
  content: Proptypes.node.isRequired,
  sideOffset: Proptypes.number,
  alignOffset: Proptypes.number,
  align: Proptypes.string,
  side: Proptypes.string
};

RPopover.defaultProps = {
  sideOffset: 0,
  alignOffset: 0,
  align: 'end',
  side: 'bottom'
};

export default RPopover;
