import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Hyperlink, MdOpenInNew } from '@browserstack/bifrost';
import { O11yButton } from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
import { FEATURE_CARD_DATA } from 'constants/paywall';
import { getInitialData } from 'globalSlice/index';
import {
  canStartFreeTrial,
  getPlanDetailsKey,
  isLoadingInitData
} from 'globalSlice/selectors';
import PropTypes from 'prop-types';

import PaywallFeatureCard from '../components/PaywallFeatureCard';

function HardPaywallWrapper({
  children,
  shouldReFetchPlanDetails,
  featureKey,
  cardConfig
}) {
  const planDetails = useSelector(getPlanDetailsKey(featureKey));
  const shouldAllowFreeTrial = useSelector(canStartFreeTrial());
  const dispatch = useDispatch();
  const isLoading = useSelector(isLoadingInitData);
  useEffect(() => {
    if (shouldReFetchPlanDetails) {
      dispatch(getInitialData());
    }
  }, [dispatch, shouldReFetchPlanDetails]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <O11yLoader />
      </div>
    );
  }

  const renderActions = () => (
    <>
      {shouldAllowFreeTrial ? (
        <O11yButton colors="success">Get a 14-day free trial</O11yButton>
      ) : (
        <O11yButton>Upgrade</O11yButton>
      )}
      <Hyperlink wrapperClassName="text-xs font-medium text-base-700 hover:text-brand-700 inline-flex gap-1">
        Learn more <MdOpenInNew />
      </Hyperlink>
    </>
  );

  if (!planDetails?.isActive) {
    return (
      <PaywallFeatureCard
        {...FEATURE_CARD_DATA[featureKey]}
        actions={renderActions()}
        cardConfig={cardConfig}
      />
    );
  }

  return <>{children}</>;
}

HardPaywallWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  shouldReFetchPlanDetails: PropTypes.bool,
  featureKey: PropTypes.string.isRequired,
  cardConfig: PropTypes.objectOf(PropTypes.any)
};

HardPaywallWrapper.defaultProps = {
  shouldReFetchPlanDetails: false,
  cardConfig: {
    wrapperClassName: '',
    showBg: true,
    hideIllustration: false
  }
};

export default HardPaywallWrapper;
