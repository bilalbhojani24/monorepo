import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStorage } from '@browserstack/utils';
import { O11yBanner, O11yButton } from 'common/bifrostProxy';
import { getTopBannerData } from 'common/O11yTopBanner/slices/selectors';
import { toggleBanner } from 'common/O11yTopBanner/slices/topBannerSlice';
import { BANNER_LAST_SEEN } from 'constants/paywall';
import { getIsOnFreeTrial, getPlanType } from 'globalSlice/selectors';
import { o11yNotify } from 'utils/notification';

function PlanTimingBanner() {
  const dispatch = useDispatch();
  const bannerData = useSelector(getTopBannerData);
  const planType = useSelector(getPlanType);
  const isOnFreeTrial = useSelector(getIsOnFreeTrial);
  const description = useMemo(() => {
    if (bannerData?.expired) {
      return `Your Observability ${planType} plan has expired on ${bannerData.expiredAt}. Please complete the upgrade process to retain test logs and keep using all the  ${planType} features.`;
    }
    if (isOnFreeTrial) {
      return `Your free trial for Observability ${planType} expires in ${bannerData.expiringInDays} days`;
    }
    return `Your Observability ${planType} expires in ${bannerData.expiringInDays} days`;
  }, [
    bannerData?.expired,
    bannerData.expiredAt,
    bannerData.expiringInDays,
    isOnFreeTrial,
    planType
  ]);

  const handleCloseBanner = () => {
    setStorage(BANNER_LAST_SEEN, Date.now());

    dispatch(
      toggleBanner({
        version: '',
        data: {}
      })
    );
  };

  const handleClickUpgrade = () => {
    o11yNotify({
      title: 'Request for upgrade received',
      description: "We'll reach out to you soon with upgrade related details",
      type: 'success'
    });
    handleCloseBanner();
  };

  return (
    <div className="text-sm">
      <O11yBanner
        ctaButton={
          <O11yButton
            colors="white"
            variant="minimal"
            wrapperClassName="underline hover:text-base-300"
            onClick={handleClickUpgrade}
          >
            Upgrade now
          </O11yButton>
        }
        description={description}
        modifier="danger"
        onDismissClick={handleCloseBanner}
        align="centered"
      />
    </div>
  );
}

export default PlanTimingBanner;
