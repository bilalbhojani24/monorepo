import { logEvent } from '@browserstack/utils';
import {
  PRODUCT_NAME,
  TEAM_NAME_EVENTS,
  WEB_EVENT_NAME
} from 'const/immutables';

export const logEventHelper = (eventName, data) => (_, getState) => {
  const state = getState();
  //   const { localStorage } = window;
  //   const isFirstSession = localStorage.getItem('isFirstSession');

  logEvent(
    [],
    WEB_EVENT_NAME,
    eventName,
    {
      ...data,
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
