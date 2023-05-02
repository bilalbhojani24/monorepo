import React from 'react';
import { useSelector } from 'react-redux';
import { BANNER_TYPES } from 'constants/bannerTypes';
import PlanTimingBanner from 'features/PlanTimingBanner';

import { getTopBannerVersion } from '../slices/selectors';

function O11yTopBanner() {
  const bannerToShow = useSelector(getTopBannerVersion);
  switch (bannerToShow) {
    case BANNER_TYPES.plan_expire:
      return <PlanTimingBanner />;
    case BANNER_TYPES.plan_started:
    default:
      return null;
  }
}

export default O11yTopBanner;
