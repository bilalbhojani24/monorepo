import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import O11yLoader from 'common/O11yLoader';
import { FEATURE_CARD_DATA } from 'constants/paywall';
import { getInitialData } from 'globalSlice/index';
import { getPlanDetailsKey, isLoadingInitData } from 'globalSlice/selectors';
import PropTypes from 'prop-types';

import PaywallActions from '../components/PaywallActions';
import PaywallFeatureCard from '../components/PaywallFeatureCard';

function HardPaywallWrapper({
  children,
  shouldReFetchPlanDetails,
  featureKey,
  wrapperClassName
}) {
  const timeOutRef = useRef();
  const planDetails = useSelector(getPlanDetailsKey(featureKey));
  const dispatch = useDispatch();
  const isLoading = useSelector(isLoadingInitData);
  useEffect(() => {
    if (shouldReFetchPlanDetails) {
      dispatch(getInitialData());
    }
  }, [dispatch, shouldReFetchPlanDetails]);

  useEffect(
    () => () => {
      clearTimeout(timeOutRef.current);
    },
    []
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <O11yLoader />
      </div>
    );
  }

  if (!planDetails?.isActive) {
    return (
      <PaywallFeatureCard
        {...FEATURE_CARD_DATA[featureKey]}
        wrapperClassName={wrapperClassName}
        actions={<PaywallActions />}
      />
    );
  }

  return <>{children}</>;
}

HardPaywallWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  shouldReFetchPlanDetails: PropTypes.bool,
  featureKey: PropTypes.string.isRequired,
  wrapperClassName: PropTypes.string
};

HardPaywallWrapper.defaultProps = {
  shouldReFetchPlanDetails: false,
  wrapperClassName: ''
};

export default HardPaywallWrapper;
