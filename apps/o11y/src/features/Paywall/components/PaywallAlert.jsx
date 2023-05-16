import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { O11yAlerts } from 'common/bifrostProxy';
import { toggleBanner } from 'common/O11yTopBanner/slices/topBannerSlice';
import { BANNER_TYPES } from 'constants/bannerTypes';
import { canStartFreeTrial } from 'globalSlice/selectors';
import PropTypes from 'prop-types';

import { handleUpgrade } from '../utils';

function PaywallAlert({ title }) {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmittedUpgradeReq, setHasSubmittedUpgradeReq] = useState(false);
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
            setHasSubmittedUpgradeReq(true);
          }
        },
        finalCb: () => setIsSubmitting(false)
      })
    );
  };

  const linkText = useMemo(() => {
    if (hasSubmittedUpgradeReq) {
      return '';
    }
    if (isSubmitting) {
      return 'Submitting...';
    }

    if (shouldAllowFreeTrial) {
      return 'Get a 14 days free trial';
    }
    return 'Upgrade';
  }, [hasSubmittedUpgradeReq, isSubmitting, shouldAllowFreeTrial]);

  return (
    <O11yAlerts
      linkText={linkText}
      accentBorder
      handleLinkClick={handleClickUpgrade}
      modifier={hasSubmittedUpgradeReq ? 'success' : 'warn'}
      title={
        hasSubmittedUpgradeReq
          ? 'Thanks for showing an interest in Observability Pro! Someone from our team would reach out to you soon with upgrade related details.'
          : title
      }
    />
  );
}
PaywallAlert.propTypes = {
  title: PropTypes.string.isRequired
};

export default PaywallAlert;
