import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStorage } from '@browserstack/utils';
import { O11yBanner, O11yButton } from 'common/bifrostProxy';
import { getTopBannerData } from 'common/O11yTopBanner/slices/selectors';
import { toggleBanner } from 'common/O11yTopBanner/slices/topBannerSlice';
import { BANNER_LAST_SEEN } from 'constants/paywall';
import { handleUpgrade } from 'features/Paywall/utils';
import { getIsOnFreeTrial } from 'globalSlice/selectors';
import { o11yNotify } from 'utils/notification';

function PlanTimingBanner() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const bannerData = useSelector(getTopBannerData);
  const isOnFreeTrial = useSelector(getIsOnFreeTrial);
  const description = useMemo(() => {
    if (bannerData?.expired) {
      return `Your Observability Pro plan has expired on ${bannerData.expiredAt}. Please complete the upgrade process to retain test logs.`;
    }
    if (isOnFreeTrial) {
      return `Your free trial for Observability Pro expires ${
        bannerData.expiringInDays === 0
          ? 'today'
          : `in ${bannerData.expiringInDays} day(s)`
      }`;
    }
    return `Your Observability Pro plan expires ${
      bannerData.expiringInDays === 0
        ? 'today'
        : `in ${bannerData.expiringInDays} day(s)`
    }`;
  }, [
    bannerData?.expired,
    bannerData.expiredAt,
    bannerData.expiringInDays,
    isOnFreeTrial
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
    setIsSubmitting(true);
    dispatch(
      handleUpgrade({
        successCb: () => {
          o11yNotify({
            title: 'Request for upgrade received',
            description:
              "We'll reach out to you soon with upgrade related details",
            type: 'success'
          });
          handleCloseBanner();
        },
        finalCb: () => setIsSubmitting(false)
      })
    );
  };

  return (
    <div className="text-sm">
      <O11yBanner
        ctaButton={
          <O11yButton
            colors="white"
            onClick={handleClickUpgrade}
            loading={isSubmitting}
            isIconOnlyButton={isSubmitting}
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
