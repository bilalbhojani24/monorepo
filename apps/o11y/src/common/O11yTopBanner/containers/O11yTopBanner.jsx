import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReqDemoBanner from 'common/Banners/ReqDemoBanner';
import { BANNER_TYPES } from 'constants/bannerTypes';
import { PlanSuccessBanner, PlanTimingBanner } from 'features/PlanBanners';
import { showBannerPerPriority } from 'utils/showBannerPerPriority';

import { getTopBannerVersion } from '../slices/selectors';

function O11yTopBanner() {
  const bannerToShow = useSelector(getTopBannerVersion);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showBannerPerPriority());
  }, [dispatch]);

  switch (bannerToShow) {
    case BANNER_TYPES.plan_expire:
      return <PlanTimingBanner />;
    case BANNER_TYPES.plan_started:
      return <PlanSuccessBanner />;
    case BANNER_TYPES.req_demo:
      return <ReqDemoBanner />;
    default:
      return null;
  }
}

export default O11yTopBanner;
