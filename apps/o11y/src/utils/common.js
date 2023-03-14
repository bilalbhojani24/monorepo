import { logEvent } from '@browserstack/utils';

export const getBaseUrl = () => {
  const { hostname, protocol } = window.location;
  const hostnameParts = hostname.split('.');
  let env = hostnameParts[0].split('-').slice(1).join('-');
  hostnameParts.shift();
  const domain = hostnameParts.join('.');
  env = env && domain === 'bsstag.com' ? `${env}.` : '';
  return `${protocol}//${env}${domain}`;
};
export const getDocUrl = ({
  path,
  useProdDomain = true,
  prependO11y = true
}) => {
  if (useProdDomain) {
    return `https://browserstack.com/docs/${
      prependO11y ? 'test-observability/' : ''
    }${path}`;
  }
  return `${getBaseUrl()}/docs/${
    prependO11y ? 'test-observability/' : ''
  }${path}`;
};

export const getNumericValue = (value) => +value.replace(/\D/g, '');

export const logOllyEvent = ({ event, data = {} }) => {
  if (!window.location.hostname.endsWith('browserstack.com')) {
    return;
  }
  const commonData = {
    url: window.location.href,
    screenResolution: {
      availHeight: window?.screen?.availHeight,
      availWidth: window?.screen?.availWidth,
      height: window?.screen?.height,
      width: window?.screen?.width
    },
    browserResolution: {
      width: window.innerWidth,
      height: window.innerHeight
    },
    product: 'observability',
    team: 'observability',
    referrer: document.referrer,
    domain:
      window.location.hostname.split('.').length >= 3
        ? window.location.hostname.split('.').slice(1, 3).join('.')
        : window.location.hostname
  };
  logEvent([], 'web_events', event, { ...commonData, ...data });
};

export const capitalize = (word, upCaseTwo = false) => {
  let result = word;
  if (result) {
    result = result.toLowerCase();
    if (upCaseTwo && result.length === 2) {
      result = result.toUpperCase();
    } else {
      result = result.charAt(0).toUpperCase() + result.slice(1);
    }
  }
  return result;
};

export const getShortOSName = (os) => {
  switch (os) {
    case 'windows':
      return 'Win';
    case 'ios':
      return 'iOS';
    case 'macos':
      return 'mac OS';
    case 'os x':
      return 'OS X';
    // case 'ipados':
    //   return 'iPadOs';
    // case 'linux':
    //   return 'linux';
    default:
      return capitalize(os);
  }
};
export const getOsIconName = (os) => {
  if (!os) {
    return 'unknown';
  }
  const formattedOS = os.toLowerCase().replace(/\s+/g, '-');
  const [osType] = formattedOS.split('-');
  if (osType === 'ios') {
    return osType;
  }

  return formattedOS;
};

export const getIconName = (name = '', device = '') => {
  if (name) {
    return `icon-${name.toLowerCase()}`;
  }
  if (device) {
    return `device_icon`;
  }
  return '';
};
