import alertIllustration from 'assets/illustrations/alerts_illustration.png';
import failureCategoryIllustration from 'assets/illustrations/failure_categories.png';
import heroUnit from 'assets/illustrations/hero-unit-o11y.png';
import { PAYWALL_FEATURES } from 'constants/paywall';

export const MODAL_CONFIG = {
  common: {
    img: heroUnit
  },
  [PAYWALL_FEATURES.ALERTS]: {
    img: alertIllustration
  },
  [PAYWALL_FEATURES.FAILURE_CATEGORY]: {
    img: failureCategoryIllustration
  },
  [PAYWALL_FEATURES.JIRA]: {}
};
