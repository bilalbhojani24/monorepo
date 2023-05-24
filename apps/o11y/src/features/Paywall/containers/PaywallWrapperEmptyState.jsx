import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineLock } from '@browserstack/bifrost';
import { O11yEmptyState } from 'common/bifrostProxy';
import { toggleBanner } from 'common/O11yTopBanner/slices/topBannerSlice';
import { BANNER_TYPES } from 'constants/bannerTypes';
import { CTA_TEXTS, FEATURE_CARD_DATA } from 'constants/paywall';
import { canStartFreeTrial, getPlanDetailsKey } from 'globalSlice/selectors';
import PropTypes from 'prop-types';
import { o11yNotify } from 'utils/notification';

import { handleUpgrade } from '../utils';

function PaywallWrapperEmptyState({ children, featureKey }) {
  const dispatch = useDispatch();
  const planDetails = useSelector(getPlanDetailsKey(featureKey));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const shouldAllowFreeTrial = useSelector(canStartFreeTrial);

  const handleClickUpgrade = () => {
    setIsSubmitting(true);
    dispatch(
      handleUpgrade({
        successCb: () => {
          if (shouldAllowFreeTrial) {
            dispatch(
              toggleBanner({
                version: BANNER_TYPES.plan_started,
                data: {}
              })
            );
          } else {
            o11yNotify({
              title: 'Request for upgrade received',
              description:
                "We'll reach out to you soon with upgrade related details",
              type: 'success'
            });
          }
        },
        finalCb: () => setIsSubmitting(false)
      })
    );
  };
  if (!planDetails?.isActive) {
    return (
      // eslint-disable-next-line tailwindcss/no-custom-classname
      <div className="classic-break-words">
        <O11yEmptyState
          title={FEATURE_CARD_DATA[featureKey]?.title}
          description={FEATURE_CARD_DATA[featureKey]?.desc}
          mainIcon={
            <MdOutlineLock className="text-base-400 inline-block h-10 w-10" />
          }
          buttonProps={{
            children: shouldAllowFreeTrial
              ? CTA_TEXTS.FREE_TRIAL
              : CTA_TEXTS.UPGRADE,
            onClick: handleClickUpgrade,
            size: 'default',
            colors: 'success',
            loading: isSubmitting,
            isIconOnlyButton: isSubmitting
          }}
        />
      </div>
    );
  }
  return <>{children}</>;
}

PaywallWrapperEmptyState.propTypes = {
  children: PropTypes.node.isRequired,
  featureKey: PropTypes.string.isRequired
};

export default PaywallWrapperEmptyState;
