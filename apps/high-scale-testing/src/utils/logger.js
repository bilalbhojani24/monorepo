import { logEvent } from '@browserstack/utils';
import { PRODUCT_NAME_CODE } from 'constants/index';
import { getUserDetails } from 'globalSlice/selector';

import { store } from '../store';

import { getEnvConfig } from './common';

const { enableAnalytics } = getEnvConfig();

const logHSTEvent = (
  skipLoggingKeys,
  eventType,
  eventName,
  data,
  cb = () => {},
  sendToGA = false
) => {
  if (!enableAnalytics) return;

  const userDetails = getUserDetails(store.getState());
  const commonData = {
    userId: userDetails.id,
    groupID: userDetails.groupID,
    referrer: document.referrer,
    url: window.location.href,
    planId: userDetails.planId || null,
    planType: userDetails.planType || null,
    product: PRODUCT_NAME_CODE,
    team: PRODUCT_NAME_CODE,
    screenResolution: {
      availHeight: window?.screen?.availHeight,
      availWidth: window?.screen?.availWidth,
      height: window?.screen?.height,
      width: window?.screen?.width
    },
    browserResolution: {
      width: window.innerWidth,
      height: window.innerHeight
    }
  };
  const eventData = { ...commonData, ...data };

  logEvent(skipLoggingKeys, eventType, eventName, eventData, cb, sendToGA);
};

export { logHSTEvent };
