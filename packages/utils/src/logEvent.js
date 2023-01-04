import getProduct from './getProductUnderScored';

/**
 * This is a wrapper function over the WebEventTracker.logEvent function which we use directly in react codebase.
 * This function can be extended further to add more functionality. like logging the google analytics events.
 * @param {string} name  Event Name,
 * @param {object} data any data which you want to send along with the event, default : {}
 * @param {Array} skipLoggingKeys An array of keys which you want to skip logging, default : ['amplitude'], Array can have 'amplitude', 'EDS' element
 */
export const logEvent = (name, data = {}, skipLoggingKeys = ['amplitude'], product) => {
  product = product || getProduct();
  const edsKey = {
    automate: window.EDS.automateWebEvent,
    app_automate: window.EDS.appAutomateWebEvents,
    live: window.EDS.liveWebEvents,
    app_live: window.EDS.appLiveWebEvents,
    online_sales: window.EDS.webEvents,
    web: window.EDS.webEvents,
    accessibility: window.EDS.webEvents
  };

  window.WebEventTracker?.logEvent(skipLoggingKeys, edsKey[product], name, {
    product,
    team: product,
    ...data
  });
};

export const sendAnalyticsEvent = (category, action, label, value) => {
  window.Analytics.ga('send', 'event', {
    eventCategory: category,
    eventAction: action,
    eventLabel: label,
    eventValue: value
  });
};
