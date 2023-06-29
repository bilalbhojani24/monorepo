import { getStorage } from '@browserstack/utils';
import { toggleBanner } from 'common/O11yTopBanner/slices/topBannerSlice';
import { BANNER_TYPES } from 'constants/bannerTypes';
import { BANNER_LAST_SEEN } from 'constants/paywall';
import { getIsFreeUser, getPlanExpires } from 'globalSlice/selectors';

import {
  getDateInFormat,
  getDifferenceInDays,
  getDifferenceInSeconds
} from './dateTime';

export const checkUserPlanState = () => (dispatch, getState) => {
  const state = getState();
  const planExpires = getPlanExpires(state);
  const isFreeUser = getIsFreeUser(state);
  // show banner only if user is on a paid plan
  if (planExpires && !isFreeUser) {
    const lastSeenOn = getStorage(BANNER_LAST_SEEN);
    const lastSeenDiff = lastSeenOn
      ? getDifferenceInDays(new Date(), new Date(lastSeenOn))
      : 2;
    const currentDate = new Date();
    const diff = getDifferenceInDays(new Date(planExpires), currentDate);
    const diffInSeconds = getDifferenceInSeconds(
      new Date(planExpires),
      currentDate
    );
    // if plan has expired more than 14 days ago, don't show banner
    if (diff < -14) {
      return;
    }
    const payload = {};
    if (lastSeenDiff >= 2) {
      if (diffInSeconds <= 0) {
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
