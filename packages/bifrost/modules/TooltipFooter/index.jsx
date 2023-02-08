import React from 'react';
import PropTypes from 'prop-types';

import { TP_ACTION_ITEM_POSITION } from '../../shared/tooltipPopoverConstants';
import { twClassNames } from '@browserstack/utils';

import './styles.scss';

const TooltipFooter = ({ children, position, wrapperClass }) => (
  <div
    className={twClassNames(
      'flex space-x-2 px-4',
      {
        'justify-end': position === TP_ACTION_ITEM_POSITION[2],
        'justify-center': position === TP_ACTION_ITEM_POSITION[1]
      },
      wrapperClass
    )}
  >
    {children}
  </div>
);

TooltipFooter.propTypes = {
  children: PropTypes.node,
  position: PropTypes.oneOf(TP_ACTION_ITEM_POSITION),
  wrapperClass: PropTypes.string
};

TooltipFooter.defaultProps = {
  children: null,
  position: TP_ACTION_ITEM_POSITION[0],
  wrapperClass: ''
};

export default TooltipFooter;
