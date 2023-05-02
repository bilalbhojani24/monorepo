import alertIllustration from 'assets/illustrations/alerts_illustration.png';
import failureCategoryIllustration from 'assets/illustrations/failure_categories.png';

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
    callout: 'NOTIFY AT SPEED',
    title: 'Monitor and take action on alerts',
    desc: 'Keep critical changes on your radar to avoid crisis scenarios. Create alerts that use index- and metric-based thresholds to send emails.',
    illustration: alertIllustration
  },
  [PAYWALL_FEATURES.FAILURE_CATEGORY]: {
    callout: 'AUTO ASSIGN FAILURE REASONS',
    title: 'Customize your failure categories',
    desc: 'Keep critical changes on your radar to avoid crisis scenarios. Create alerts that use index- and metric-based thresholds to send emails.',
    illustration: failureCategoryIllustration
  }
};
