import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { TP_ACTION_ITEM_POSITION } from '../../shared/tooltipPopoverConstants';

const TooltipFooter = ({ children, position, wrapperClassName }) => (
  <div
    className={twClassNames(
      'flex space-x-3 px-4',
      {
        'justify-end': position === TP_ACTION_ITEM_POSITION[2],
        'justify-center': position === TP_ACTION_ITEM_POSITION[1]
      },
      wrapperClassName
    )}
  >
    {children}
  </div>
);

TooltipFooter.propTypes = {
  children: PropTypes.node,
  position: PropTypes.oneOf(TP_ACTION_ITEM_POSITION),
  wrapperClassName: PropTypes.string
};

TooltipFooter.defaultProps = {
  children: null,
  position: TP_ACTION_ITEM_POSITION[0],
  wrapperClassName: ''
};

export default TooltipFooter;
