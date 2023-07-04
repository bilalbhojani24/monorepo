import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { O11yAlerts } from 'common/bifrostProxy';
import { toggleBanner } from 'common/O11yTopBanner/slices/topBannerSlice';
import { BANNER_TYPES } from 'constants/bannerTypes';
import { EXTERNAL_LINKS } from 'constants/common';
import { CTA_TEXTS } from 'constants/paywall';
import { canStartFreeTrial } from 'globalSlice/selectors';
import PropTypes from 'prop-types';
import { getExternalUrl, logOllyEvent } from 'utils/common';

import { handleUpgrade } from '../utils';

function PaywallAlert({ title }) {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const shouldAllowFreeTrial = useSelector(canStartFreeTrial);

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

  const linkText = useMemo(() => {
    if (isSubmitting) {
      return 'Submitting...';
    }

    if (shouldAllowFreeTrial) {
      return CTA_TEXTS.FREE_TRIAL;
    }
    return CTA_TEXTS.UPGRADE;
  }, [isSubmitting, shouldAllowFreeTrial]);

  return (
    <O11yAlerts
      detailsNode={
        <>
          {linkText && (
            <p className="whitespace-nowrap">
              <span>{linkText}</span>
              {!isSubmitting && (
                <span aria-hidden="true" className="ml-1">
                  &rarr;
                </span>
              )}
            </p>
          )}
        </>
      }
      accentBorder
      handleLinkClick={handleClickUpgrade}
      modifier="warn"
      description={title}
    />
  );
}
PaywallAlert.propTypes = {
  title: PropTypes.string.isRequired
};

export default PaywallAlert;
