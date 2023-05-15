import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Hyperlink, MdCheckCircle, MdOpenInNew } from '@browserstack/bifrost';
import { O11yButton } from 'common/bifrostProxy';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import { MODAL_TYPES } from 'constants/modalTypes';
import { CTA_TEXTS } from 'constants/paywall';
import { o11yPlanUpgrade } from 'globalSlice/index';
import { canStartFreeTrial } from 'globalSlice/selectors';
import PropTypes from 'prop-types';
import { o11yNotify } from 'utils/notification';

function PaywallActions({ featureKey, showTextOnSubmit, isOnDarkBg }) {
  const [hasSubmittedUpgradeReq, setHasSubmittedUpgradeReq] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const timeOutRef = useRef();
  const shouldAllowFreeTrial = useSelector(canStartFreeTrial);
  const handleClickGetFreeTrial = () => {
    dispatch(
      toggleModal({
        version: MODAL_TYPES.upgrade_modal,
        data: {
          featureKey
        }
      })
    );
  };
  const handleClickUpgrade = () => {
    setIsSubmitting(true);
    dispatch(o11yPlanUpgrade())
      .unwrap()
      .then(() => {
        if (showTextOnSubmit) {
          clearTimeout(timeOutRef.current);
          setHasSubmittedUpgradeReq(true);
          timeOutRef.current = setTimeout(() => {
            setHasSubmittedUpgradeReq(false);
          }, 5000);
        } else {
          o11yNotify({
            title: 'Request for upgrade received',
            description:
              "We'll reach out to you soon with upgrade related details",
            type: 'success'
          });
        }
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
  };

  if (hasSubmittedUpgradeReq && showTextOnSubmit) {
    return (
      <p className="flex gap-2 text-sm font-medium">
        <MdCheckCircle className="text-success-600 mt-0.5 shrink-0 text-lg" />
        <span>
          Thanks for showing an interest in Observability Pro! Someone from our
          team would reach out to you soon with upgrade related details.
        </span>
      </p>
    );
  }

  return (
    <>
      {shouldAllowFreeTrial ? (
        <O11yButton colors="success" onClick={handleClickGetFreeTrial}>
          {CTA_TEXTS.FREE_TRIAL}
        </O11yButton>
      ) : (
        <O11yButton
          loading={isSubmitting}
          isIconOnlyButton={isSubmitting}
          onClick={handleClickUpgrade}
        >
          {CTA_TEXTS.UPGRADE}
        </O11yButton>
      )}
      {isOnDarkBg ? (
        <O11yButton
          colors="white"
          wrapperClassName="bg-base-600 text-white hover:text-base-900 shrink-0"
          // onClick={}
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
  featureKey: PropTypes.string.isRequired,
  showTextOnSubmit: PropTypes.bool,
  isOnDarkBg: PropTypes.bool
};

PaywallActions.defaultProps = {
  showTextOnSubmit: false,
  isOnDarkBg: false
};

export default PaywallActions;
