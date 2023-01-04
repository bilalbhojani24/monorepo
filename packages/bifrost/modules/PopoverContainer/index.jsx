import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import PropTypes from 'prop-types';
import { PLACEMENT_ALIGN, PLACEMENT_SIDE } from '../SharedTooltipPopover/const';
import classNames from 'classnames';

import './styles.scss';

const PopoverContainer = (props) => {
  const { arrowClassName, children, content, placementAlign, placementSide } = props;

  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger as>{children}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content sideOffset={5} side={placementSide} align={placementAlign}>
          {content}
          <PopoverPrimitive.Arrow height={10} width={20} className={classNames('arrow', arrowClassName)} />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};

PopoverContainer.propTypes = {
  arrowClassName: PropTypes.string,
  content: PropTypes.node,
  children: PropTypes.node,
  placementAlign: PropTypes.oneOf(PLACEMENT_ALIGN),
  placementSide: PropTypes.oneOf(PLACEMENT_SIDE),
};
PopoverContainer.defaultProps = {
  arrowClassName: '',
  content: null,
  children: null,
  placementAlign: PLACEMENT_ALIGN[0],
  placementSide: PLACEMENT_SIDE[0],
};

export default PopoverContainer;
