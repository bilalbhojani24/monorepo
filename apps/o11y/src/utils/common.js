import { convertNodeToElement } from 'react-html-parser';
import { logEvent } from '@browserstack/utils';
import { TEST_STATUS, UNSUPPORTED_HTML_TAGS } from 'constants/common';
import stageConfigMapping from 'constants/stageConfigMapping';

export const getBaseUrl = () => {
  const { hostname, protocol } = window.location;
  const hostnameParts = hostname.split('.');
  let env = hostnameParts[0].split('-').slice(1).join('-');
  hostnameParts.shift();
  const domain = hostnameParts.join('.');
  env = env && domain === 'bsstag.com' ? `${env}.` : '';
  return `${protocol}//${env}${domain}`;
};
export const getEnvConfig = (stage = import.meta.env.BSTACK_STAGE) => {
  if (!stage) {
    let guessedStage = '';
    if (window.location.hostname.endsWith('browserstack.com')) {
      guessedStage = 'production';
    } else if (window.location.hostname.includes('local')) {
      guessedStage = 'local';
    } else if (window.location.hostname.includes('preprod')) {
      guessedStage = 'preprod';
    } else {
      guessedStage = 'staging';
    }
    return stageConfigMapping[guessedStage];
  }
  // TODO: Keeping  default  stage to staging for now, until production env is ready
  return stageConfigMapping[stage] || stageConfigMapping.staging;
};

export const getDocUrl = ({ path, prependO11y = true }) =>
  `${getEnvConfig().baseUrl}/docs/${
    prependO11y ? 'test-observability/' : ''
  }${path}`;

export const getNumericValue = (value) => +value.replace(/\D/g, '') || '';

export const logOllyEvent = ({ event, data = {} }) => {
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
        : window.location.hostname,
    is_dark_mode:
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
  };
  if (getEnvConfig().enableAnalytics || window.BSTACK_LOG_ANALYTICS_ENABLED) {
    logEvent([], 'web_events', event, { ...commonData, ...data });
  } else {
    // eslint-disable-next-line no-console
    console.log('Event Name:', event);
    // eslint-disable-next-line no-console
    console.table({ ...commonData, ...data });
  }
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
    case 'winphone':
      return 'WinPhone';
    default:
      return capitalize(os);
  }
};
export const getOsIconName = (os) => {
  if (!os) {
    return 'default_os';
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
  return 'icon-default_browser';
};

// eslint-disable-next-line sonarjs/cognitive-complexity
export const getBuildMarkedStatus = (buildStatus, statusAgg = {}) => {
  if (!buildStatus || buildStatus === TEST_STATUS.STARTED) {
    return TEST_STATUS.PENDING;
  }
  if (buildStatus === TEST_STATUS.TIMEOUT) {
    if (statusAgg.failed) {
      return TEST_STATUS.FAIL;
    }
    if (statusAgg.timeout) {
      return TEST_STATUS.UNKNOWN;
    }
    if (statusAgg.passed) {
      return TEST_STATUS.PASS;
    }
    if (statusAgg.skipped) {
      return TEST_STATUS.SKIPPED;
    }
    return TEST_STATUS.UNKNOWN;
  }
  if (buildStatus === TEST_STATUS.FINISHED) {
    if (statusAgg.failed) {
      return TEST_STATUS.FAIL;
    }
    if (statusAgg.passed) {
      return TEST_STATUS.PASS;
    }
    if (statusAgg.skipped) {
      return TEST_STATUS.SKIPPED;
    }
    if (statusAgg.timeout) {
      return TEST_STATUS.UNKNOWN;
    }
    return TEST_STATUS.SKIPPED;
  }
  return TEST_STATUS.UNKNOWN;
};

export const abbrNumber = (num = 0) =>
  Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(num)
    .padStart(2, '0');

export const transformUnsupportedTags = (node, index) => {
  const updatedNode = node;
  if (
    updatedNode.type === 'tag' &&
    UNSUPPORTED_HTML_TAGS.includes(updatedNode.name)
  ) {
    updatedNode.children = [
      {
        data: `<${updatedNode.name}>`,
        type: 'text'
      },
      ...updatedNode.children
    ];
    updatedNode.name = 'span';
  }
  return convertNodeToElement(updatedNode, index, transformUnsupportedTags);
};
