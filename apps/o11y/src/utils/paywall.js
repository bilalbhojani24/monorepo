import { getStorage } from '@browserstack/utils';
import { toggleBanner } from 'common/O11yTopBanner/slices/topBannerSlice';
import { BANNER_TYPES } from 'constants/bannerTypes';
import { BANNER_LAST_SEEN } from 'constants/paywall';
import { getPlanExpires } from 'globalSlice/selectors';

import { getDateInFormat, getDifferenceInDays } from './dateTime';

export const checkUserPlanState = () => (dispatch, getState) => {
  const state = getState();
  const planExpires = getPlanExpires(state);
  if (planExpires) {
    const lastSeenOn = getStorage(BANNER_LAST_SEEN);
    const lastSeenDiff = lastSeenOn
      ? getDifferenceInDays(new Date(), new Date(lastSeenOn))
      : 2;
    const diff = getDifferenceInDays(new Date(planExpires), new Date());
    const payload = {};
    if (lastSeenDiff >= 2) {
      if (diff <= 0) {
        payload.expired = true;
        payload.expiredAt = getDateInFormat(new Date(planExpires));
        dispatch(
          toggleBanner({
            version: BANNER_TYPES.plan_expire,
            data: payload
          })
        );
      } else if (diff <= 7) {
        payload.expired = false;
        payload.expiringInDays = diff;
        dispatch(
          toggleBanner({
            version: BANNER_TYPES.plan_expire,
            data: payload
          })
        );
      }
    }
  }
};
