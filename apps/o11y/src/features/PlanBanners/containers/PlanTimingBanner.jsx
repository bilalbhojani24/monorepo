import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStorage } from '@browserstack/utils';
import { O11yBanner, O11yButton } from 'common/bifrostProxy';
import { getTopBannerData } from 'common/O11yTopBanner/slices/selectors';
import { toggleBanner } from 'common/O11yTopBanner/slices/topBannerSlice';
import { EXTERNAL_LINKS } from 'constants/common';
import { BANNER_LAST_SEEN } from 'constants/paywall';
import { getIsOnFreeTrial } from 'globalSlice/selectors';
import { getExternalUrl, logOllyEvent } from 'utils/common';

function PlanTimingBanner() {
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
    logOllyEvent({
      event: 'O11yUpgradeModalInteracted',
      data: {
        interaction: 'upgrade_cta_clicked'
      }
    });
    handleCloseBanner();
    window.open(
      getExternalUrl({ path: EXTERNAL_LINKS.planAndPricing }),
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="text-sm">
      <O11yBanner
        ctaButton={
          <O11yButton colors="white" onClick={handleClickUpgrade}>
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
