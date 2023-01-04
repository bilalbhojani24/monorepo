import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PLACEMENT_ALIGN, PLACEMENT_SIDE } from '../SharedTooltipPopover/const';

import './styles.scss';

const TooltipContainer = (props) => {
  const { arrowClassName, children, content, delay, placementAlign, placementSide } = props;

  return (
    <TooltipPrimitive.Provider delayDuration={delay} skipDelayDuration={500}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger as>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content sideOffset={5} side={placementSide} align={placementAlign}>
            {content}
            <TooltipPrimitive.Arrow height={10} width={20} className={classNames('arrow', arrowClassName)} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

TooltipContainer.propTypes = {
  arrowClassName: PropTypes.string,
  content: PropTypes.node,
  children: PropTypes.node,
  delay: PropTypes.number,
  placementAlign: PropTypes.oneOf(PLACEMENT_ALIGN),
  placementSide: PropTypes.oneOf(PLACEMENT_SIDE),
};
TooltipContainer.defaultProps = {
  arrowClassName: '',
  content: null,
  children: null,
  delay: 200,
  placementAlign: PLACEMENT_ALIGN[0],
  placementSide: PLACEMENT_SIDE[0],
};

export default TooltipContainer;
