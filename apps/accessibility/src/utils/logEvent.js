import {
  initLogger,
  logEvent as logAccessibilityEvent
} from '@browserstack/utils';
import { EDSKey } from 'constants';

// initLogger({
//   amplitudeKey: '',
//   analyticsKey: '',
//   EDSDetails: ''
// });

export const getConfigByKey = (key) => {
  const envVars = import.meta.env;
  if (!key) {
    return null;
  }
  return envVars[key];
};

export const getCookieByKeyName = (key) => {
  const name = `${key}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

export const logEvent = (name, data = {}, skipLoggingKeys = ['amplitude']) => {
  const product = 'accessibility';

  return null;
  // logAccessibilityEvent(skipLoggingKeys, EDSKey, name, {
  //   product,
  //   team: product,
  //   ...data
  // });
};
