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

  logEvent(['EDS'], WEB_EVENT_NAME, eventName, {
    ...data,
    user_id: state.global?.user?.id,
    product: PRODUCT_NAME,
    team: TEAM_NAME_EVENTS,
    sendToGA: true
  });
};
