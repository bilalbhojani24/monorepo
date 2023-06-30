import AlertsIllustration from 'assets/illustrations/alerts_illustration';
import FailureCategoriesIllustration from 'assets/illustrations/failure_categories_illustration';
import { getDocUrl } from 'utils/common';

import { DOC_KEY_MAPPING } from './common';

export const BANNER_LAST_SEEN = 'BANNER_LAST_SEEN';

export const PAYWALL_FEATURES = {
  ALERTS: 'alerts',
  FAILURE_CATEGORY: 'failureCategory',
  SMART_TAGS: 'smartTags',
  JIRA: 'jira',
  RE_RUN: 'rerun',
  MUTE: 'rerun'
};

export const FEATURE_CARD_DATA = {
  [PAYWALL_FEATURES.ALERTS]: {
    callout: 'GET NOTIFIED',
    title: 'Set up actionable alerts',
    desc: 'Identify problematic tests before they turn into critical issues. Set up alerts on metrics that you care about.',
    illustration: AlertsIllustration,
    learnMoreLink: getDocUrl({ path: DOC_KEY_MAPPING.settings_alerts })
  },
  [PAYWALL_FEATURES.FAILURE_CATEGORY]: {
    callout: 'AUTO-ASSIGN FAILURE REASONS',
    title: 'Customize your failure categories',
    desc: 'Failure categories are a way for you to create and apply custom tags to your test failures, such as API bug, database issue, or any other category relevant to you.',
    illustration: FailureCategoriesIllustration,
    learnMoreLink: getDocUrl({
      path: DOC_KEY_MAPPING.settings_failure_category
    })
  }
};

export const CTA_TEXTS = {
  FREE_TRIAL: 'Start a 14-days free trial',
  UPGRADE: 'Upgrade'
};
