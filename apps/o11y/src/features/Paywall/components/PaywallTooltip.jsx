import React from 'react';
import { useSelector } from 'react-redux';
import {
  TooltipBody,
  TooltipFooter,
  TooltipHeader
} from '@browserstack/bifrost';
import { O11yTooltip } from 'common/bifrostProxy';
import { getPlanDetailsKey } from 'globalSlice/selectors';
import PropTypes from 'prop-types';

import PaywallActions from './PaywallActions';

function PaywallTooltip({ children, title, content, featureKey, docLink }) {
  const planDetails = useSelector(getPlanDetailsKey(featureKey));
  return (
    <O11yTooltip
      size="sm"
      content={
        !planDetails?.isActive ? (
          <>
            <TooltipHeader>
              <span className="text-sm">{title}</span>
            </TooltipHeader>
            <TooltipBody>
              <p className="text-sm">{content}</p>
            </TooltipBody>
            <TooltipFooter>
              <PaywallActions isOnDarkBg docLink={docLink} />
            </TooltipFooter>
          </>
        ) : null
      }
      theme="dark"
      arrowWidth={!planDetails?.isActive ? 20 : 0}
    >
      {children}
    </O11yTooltip>
  );
}

PaywallTooltip.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  featureKey: PropTypes.string.isRequired,
  docLink: PropTypes.string.isRequired
};

export default PaywallTooltip;
