import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Hyperlink, MdCheckCircle, MdOpenInNew } from '@browserstack/bifrost';
import { O11yButton } from 'common/bifrostProxy';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import O11yLoader from 'common/O11yLoader';
import { MODAL_TYPES } from 'constants/modalTypes';
import { FEATURE_CARD_DATA } from 'constants/paywall';
import { getInitialData, o11yPlanUpgrade } from 'globalSlice/index';
import {
  canStartFreeTrial,
  getPlanDetailsKey,
  isLoadingInitData
} from 'globalSlice/selectors';
import PropTypes from 'prop-types';
import { o11yNotify } from 'utils/notification';

import PaywallFeatureCard from '../components/PaywallFeatureCard';

function HardPaywallWrapper({
  children,
  shouldReFetchPlanDetails,
  featureKey,
  cardConfig
}) {
  const timeOutRef = useRef();
  const planDetails = useSelector(getPlanDetailsKey(featureKey));
  const shouldAllowFreeTrial = useSelector(canStartFreeTrial);
  const dispatch = useDispatch();
  const isLoading = useSelector(isLoadingInitData);
  const [hasSubmittedUpgradeReq, setHasSubmittedUpgradeReq] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const renderActions = () => {
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
          clearTimeout(timeOutRef.current);
          setHasSubmittedUpgradeReq(true);
          timeOutRef.current = setTimeout(() => {
            setHasSubmittedUpgradeReq(false);
          }, 5000);
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

    if (hasSubmittedUpgradeReq) {
      return (
        <p className="flex gap-2 text-sm font-medium">
          <MdCheckCircle className="text-success-600 mt-0.5 shrink-0 text-lg" />
          <span>
            Thanks for showing an interest in Observability Pro! Someone from
            our team would reach out to you soon with upgrade related details.
          </span>
        </p>
      );
    }

    return (
      <>
        {shouldAllowFreeTrial ? (
          <O11yButton colors="success" onClick={handleClickGetFreeTrial}>
            Get a 14-days free trial
          </O11yButton>
        ) : (
          <O11yButton
            loading={isSubmitting}
            isIconOnlyButton={isSubmitting}
            onClick={handleClickUpgrade}
          >
            Upgrade
          </O11yButton>
        )}
        <Hyperlink wrapperClassName="text-xs font-medium text-base-700 hover:text-brand-700 inline-flex gap-1">
          Learn more <MdOpenInNew />
        </Hyperlink>
      </>
    );
  };

  if (planDetails && !planDetails?.isActive) {
    return (
      <PaywallFeatureCard
        {...FEATURE_CARD_DATA[featureKey]}
        actions={renderActions()}
        cardConfig={cardConfig}
      />
    );
  }

  return <>{children}</>;
}

HardPaywallWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  shouldReFetchPlanDetails: PropTypes.bool,
  featureKey: PropTypes.string.isRequired,
  cardConfig: PropTypes.objectOf(PropTypes.any)
};

HardPaywallWrapper.defaultProps = {
  shouldReFetchPlanDetails: false,
  cardConfig: {
    wrapperClassName: '',
    showBg: true,
    hideIllustration: false
  }
};

export default HardPaywallWrapper;
