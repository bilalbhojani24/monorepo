import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CTACardActions, MdOpenInNew } from '@browserstack/bifrost';
import { toggleBanner } from 'common/O11yTopBanner/slices/topBannerSlice';
import { BANNER_TYPES } from 'constants/bannerTypes';
import { EXTERNAL_LINKS } from 'constants/common';
import { CTA_TEXTS } from 'constants/paywall';
import { canStartFreeTrial } from 'globalSlice/selectors';
import PropTypes from 'prop-types';
import { getExternalUrl, logOllyEvent } from 'utils/common';

import { handleUpgrade } from '../utils';

function PaywallCTACardActions({ learnMoreLink }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const shouldAllowFreeTrial = useSelector(canStartFreeTrial);
  const handleClickStartFreeTrial = () => {
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
  };

  const handleClickUpgrade = () => {
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
  };

  const handleLearnMoreClick = () => {
    if (learnMoreLink) {
      logOllyEvent({
        event: 'O11yUpgradeModalInteracted',
        data: {
          interaction: 'secondary_cta_clicked'
        }
      });
      window.open(learnMoreLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <CTACardActions
      primaryBtnText={
        shouldAllowFreeTrial ? CTA_TEXTS.FREE_TRIAL : CTA_TEXTS.UPGRADE
      }
      secondaryBtnText={
        <span className="flex flex-row items-center gap-1">
          Learn more <MdOpenInNew />
        </span>
      }
      onPrimayBtnClick={() => {
        if (shouldAllowFreeTrial) {
          handleClickStartFreeTrial();
        } else {
          handleClickUpgrade();
        }
      }}
      onSecondaryBtnClick={handleLearnMoreClick}
      primaryBtnProps={{
        colors: 'success',
        loading: isSubmitting,
        isIconOnlyButton: isSubmitting
      }}
      secondaryBtnProps={{
        colors: 'white'
      }}
    />
  );
}

PaywallCTACardActions.propTypes = {
  learnMoreLink: PropTypes.string.isRequired
};

PaywallCTACardActions.defaultProps = {};

export default PaywallCTACardActions;
