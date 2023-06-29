import AlertsIllustration from 'assets/illustrations/alerts_illustration';
import FailureCategoriesIllustration from 'assets/illustrations/failure_categories_illustration';
import HeroUnitO11y from 'assets/illustrations/hero_unit_o11y';
import { PAYWALL_FEATURES } from 'constants/paywall';

export const MODAL_CONFIG = {
  common: {
    img: HeroUnitO11y
  },
  [PAYWALL_FEATURES.ALERTS]: {
    img: AlertsIllustration
  },
  [PAYWALL_FEATURES.FAILURE_CATEGORY]: {
    img: FailureCategoriesIllustration
  },
  [PAYWALL_FEATURES.JIRA]: {}
};
