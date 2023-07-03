import { getStorage } from '@browserstack/utils';
import { toggleBanner } from 'common/O11yTopBanner/slices/topBannerSlice';
import { BANNER_TYPES } from 'constants/bannerTypes';
import { getHasExperiencedPaidPlan } from 'globalSlice/selectors';

import { checkUserPlanState } from './paywall';

export const REQ_DEMO_BANNER_SEEN = 'REQ_DEMO_BANNER_SEEN';

const checkNShowDemoBanner = () => (dispatch, getState) => {
  const hasAlreadySeenBanner = getStorage(REQ_DEMO_BANNER_SEEN);
  const state = getState();
  const hasExperiencedPaidPlan = getHasExperiencedPaidPlan(state);
  if (!(hasAlreadySeenBanner || hasExperiencedPaidPlan)) {
    dispatch(
      toggleBanner({
        version: BANNER_TYPES.req_demo,
        data: {}
      })
    );
  }
};

export const showBannerPerPriority = () => (dispatch) => {
  // calls are arranged in asc priority
  dispatch(checkNShowDemoBanner());
  dispatch(checkUserPlanState());
};
