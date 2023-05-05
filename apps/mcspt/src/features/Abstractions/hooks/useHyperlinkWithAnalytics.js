import { mcpAnalyticsEvent } from 'utils/analyticsUtils';

const useHyperlinkWithAnalytics = (
  consumerClickFn,
  linkToBeSentToAnalytics
) => {
  const performClickWithAnalytics = (linkEvent) => {
    linkEvent.preventDefault?.();
    linkEvent.stopPropagation?.();

    mcpAnalyticsEvent('csptLinkClick', { url: linkToBeSentToAnalytics });

    consumerClickFn();
  };

  return {
    performClickWithAnalytics
  };
};

export default useHyperlinkWithAnalytics;
