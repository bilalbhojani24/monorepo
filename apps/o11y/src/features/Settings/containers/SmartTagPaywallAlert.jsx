import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { O11yAlerts } from 'common/bifrostProxy';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import { MODAL_TYPES } from 'constants/modalTypes';
import { PAYWALL_FEATURES } from 'constants/paywall';
import { o11yPlanUpgrade } from 'globalSlice/index';
import { canStartFreeTrial, getPlanDetailsKey } from 'globalSlice/selectors';
import { o11yNotify } from 'utils/notification';

function SmartTagPaywallAlert() {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmittedUpgradeReq, setHasSubmittedUpgradeReq] = useState(false);

  const planDetails = useSelector(
    getPlanDetailsKey(PAYWALL_FEATURES.SMART_TAGS)
  );
  const shouldAllowFreeTrial = useSelector(canStartFreeTrial);

  const handleClickUpgrade = () => {
    if (shouldAllowFreeTrial) {
      dispatch(
        toggleModal({
          version: MODAL_TYPES.upgrade_modal,
          data: {
            featureKey: PAYWALL_FEATURES.SMART_TAGS
          }
        })
      );
    } else {
      setIsSubmitting(true);
      dispatch(o11yPlanUpgrade())
        .unwrap()
        .then(() => {
          setHasSubmittedUpgradeReq(true);
        })
        .catch(() => {
          o11yNotify({
            title: 'Something went wrong!',
            description: 'Please try again later.',
            type: 'error'
          });
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
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

  if (planDetails && planDetails?.isActive) {
    return null;
  }

  return (
    <O11yAlerts
      linkText={linkText}
      accentBorder
      handleLinkClick={handleClickUpgrade}
      modifier={hasSubmittedUpgradeReq ? 'success' : 'warn'}
      title={
        hasSubmittedUpgradeReq
          ? 'Thanks for showing an interest in Observability Pro! Someone from our team would reach out to you soon with upgrade related details.'
          : 'Configuring Smart tags is a pro feature'
      }
    />
  );
}

export default SmartTagPaywallAlert;
