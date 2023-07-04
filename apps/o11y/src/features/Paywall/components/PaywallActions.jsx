import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Hyperlink, MdOpenInNew } from '@browserstack/bifrost';
import { O11yButton } from 'common/bifrostProxy';
import { toggleBanner } from 'common/O11yTopBanner/slices/topBannerSlice';
import { BANNER_TYPES } from 'constants/bannerTypes';
import { CTA_TEXTS } from 'constants/paywall';
import { canStartFreeTrial } from 'globalSlice/selectors';
import PropTypes from 'prop-types';
import { logOllyEvent } from 'utils/common';

import { handleUpgrade } from '../utils';

function PaywallActions({ isOnDarkBg, docLink }) {
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
    // window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleLearnMoreClick = () => {
    logOllyEvent({
      event: 'O11yUpgradeModalInteracted',
      data: {
        interaction: 'secondary_cta_clicked'
      }
    });
    window.open(docLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <O11yButton
        colors="success"
        loading={isSubmitting}
        isIconOnlyButton={isSubmitting}
        onClick={() => {
          if (shouldAllowFreeTrial) {
            handleClickStartFreeTrial();
          } else {
            handleClickUpgrade();
          }
        }}
      >
        {shouldAllowFreeTrial ? CTA_TEXTS.FREE_TRIAL : CTA_TEXTS.UPGRADE}
      </O11yButton>
      {isOnDarkBg ? (
        <O11yButton
          colors="white"
          wrapperClassName="bg-base-600 text-white hover:text-base-900 shrink-0"
          onClick={handleLearnMoreClick}
        >
          Learn more
        </O11yButton>
      ) : (
        <Hyperlink wrapperClassName="text-xs font-medium text-base-700 hover:text-brand-700 inline-flex gap-1">
          Learn more <MdOpenInNew />
        </Hyperlink>
      )}
    </>
  );
}

PaywallActions.propTypes = {
  isOnDarkBg: PropTypes.bool,
  docLink: PropTypes.string.isRequired
};

PaywallActions.defaultProps = {
  isOnDarkBg: false
};

export default PaywallActions;
