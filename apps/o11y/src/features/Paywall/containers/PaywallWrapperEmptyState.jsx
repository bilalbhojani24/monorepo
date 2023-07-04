import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineLock } from '@browserstack/bifrost';
import { O11yEmptyState } from 'common/bifrostProxy';
import { toggleBanner } from 'common/O11yTopBanner/slices/topBannerSlice';
import { BANNER_TYPES } from 'constants/bannerTypes';
import { EXTERNAL_LINKS } from 'constants/common';
import { CTA_TEXTS, FEATURE_CARD_DATA } from 'constants/paywall';
import { canStartFreeTrial, getPlanDetailsKey } from 'globalSlice/selectors';
import PropTypes from 'prop-types';
import { getExternalUrl, logOllyEvent } from 'utils/common';

import { handleUpgrade } from '../utils';

function PaywallWrapperEmptyState({ children, featureKey }) {
  const dispatch = useDispatch();
  const planDetails = useSelector(getPlanDetailsKey(featureKey));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const shouldAllowFreeTrial = useSelector(canStartFreeTrial);

  useEffect(() => {
    if (!planDetails?.isActive) {
      logOllyEvent({
        event: 'O11yUpgradeModalShown',
        data: {
          source: FEATURE_CARD_DATA[featureKey]?.instrumentKey
        }
      });
    }
  }, [featureKey, planDetails?.isActive]);

  const handleClickUpgrade = () => {
    if (shouldAllowFreeTrial) {
      setIsSubmitting(true);
      dispatch(
        handleUpgrade({
          successCb: () => {
            dispatch(
              toggleBanner({
                version: BANNER_TYPES.plan_started,
                data: {}
              })
            );
          },
          finalCb: () => setIsSubmitting(false)
        })
      );
    } else {
      logOllyEvent({
        event: 'O11yUpgradeModalInteracted',
        data: {
          interaction: 'upgrade_cta_clicked'
        }
      });
      window.open(
        getExternalUrl({ path: EXTERNAL_LINKS.planAndPricing }),
        '_blank',
        'noopener,noreferrer'
      );
    }
  };

  if (!planDetails?.isActive) {
    return (
      <div className="break-words">
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
