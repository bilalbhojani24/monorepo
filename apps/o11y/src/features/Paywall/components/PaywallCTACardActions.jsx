import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CTACardActions,
  MdCheckCircle,
  MdOpenInNew
} from '@browserstack/bifrost';
import { toggleBanner } from 'common/O11yTopBanner/slices/topBannerSlice';
import { BANNER_TYPES } from 'constants/bannerTypes';
import { CTA_TEXTS } from 'constants/paywall';
import { canStartFreeTrial } from 'globalSlice/selectors';
import PropTypes from 'prop-types';

import { handleUpgrade } from '../utils';

function PaywallCTACardActions({ showTextOnSubmit, learnMoreLink }) {
  const [hasSubmittedUpgradeReq, setHasSubmittedUpgradeReq] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const timeOutRef = useRef();
  const shouldAllowFreeTrial = useSelector(canStartFreeTrial);
  const handleClickUpgrade = (clickedFromFreeTrial) => {
    setIsSubmitting(true);
    dispatch(
      handleUpgrade({
        successCb: () => {
          if (clickedFromFreeTrial) {
            dispatch(
              toggleBanner({
                version: BANNER_TYPES.plan_started,
                data: {}
              })
            );
          } else if (showTextOnSubmit) {
            clearTimeout(timeOutRef.current);
            setHasSubmittedUpgradeReq(true);
            timeOutRef.current = setTimeout(() => {
              setHasSubmittedUpgradeReq(false);
            }, 5000);
          }
        },
        finalCb: () => setIsSubmitting(false)
      })
    );
  };

  if (hasSubmittedUpgradeReq && showTextOnSubmit) {
    return (
      <CTACardActions
        primaryBtnText={
          <span className="flex gap-2 text-left text-sm font-medium">
            <MdCheckCircle className="text-success-600 mt-0.5 shrink-0 text-lg" />
            <span>
              Thanks for showing an interest in Observability Pro! Someone from
              our team would reach out to you soon with upgrade related details.
            </span>
          </span>
        }
        onPrimayBtnClick={() => {}}
        primaryBtnProps={{
          colors: 'white',
          variant: 'minimal'
        }}
      />
    );
  }

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
        handleClickUpgrade(shouldAllowFreeTrial);
      }}
      onSecondaryBtnClick={() => {
        if (learnMoreLink) {
          window.open(learnMoreLink, '_blank', 'noopener,noreferrer');
        }
      }}
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
  showTextOnSubmit: PropTypes.bool,
  learnMoreLink: PropTypes.string.isRequired
};

PaywallCTACardActions.defaultProps = {
  showTextOnSubmit: false
};

export default PaywallCTACardActions;
