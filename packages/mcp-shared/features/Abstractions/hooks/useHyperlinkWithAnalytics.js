import { mcpAnalyticsEvent } from '../../../utils/analyticsUtils';

const useHyperlinkWithAnalytics = (
  consumerClickFn,
  linkToBeSentToAnalytics
) => {
  const performClickWithAnalytics = (linkEvent) => {
    linkEvent.preventDefault?.();
    linkEvent.stopPropagation?.();

    mcpAnalyticsEvent('csptLinkClick', { link_url: linkToBeSentToAnalytics });

    consumerClickFn();
  };

  return {
    performClickWithAnalytics
  };
};

export default useHyperlinkWithAnalytics;
