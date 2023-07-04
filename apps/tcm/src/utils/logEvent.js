import { cookieUtils as CookieUtils, logEvent } from '@browserstack/utils';
import {
  PRODUCT_NAME,
  TEAM_NAME_EVENTS,
  WEB_EVENT_NAME
} from 'const/immutables';

const cookieUtils = new CookieUtils();
export const logEventHelper = (eventName, data) => (_, getState) => {
  const state = getState();
  //   const { localStorage } = window;
  //   const isFirstSession = localStorage.getItem('isFirstSession');

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log(`Event Tracked Name: ${eventName}`);
  }

  const experimentValue = {
    experiments: {
      header_scalability: cookieUtils.read('header_scalability')
    }
  };

  logEvent(
    [],
    WEB_EVENT_NAME,
    eventName,
    {
      ...data,
      ...experimentValue,
      user_id: state.global?.userAndGroupConfig?.bsUserId,
      tm_user_id: state.global?.userAndGroupConfig?.tmUserId,
      group_id: state.global?.userAndGroupConfig?.bsGroupId,
      tm_group_id: state.global?.userAndGroupConfig?.tmGroupId,
      product: PRODUCT_NAME,
      team: TEAM_NAME_EVENTS
    },
    undefined,
    true
  );
};
