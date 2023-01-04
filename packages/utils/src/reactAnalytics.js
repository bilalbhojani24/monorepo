import axios from 'axios';

// We keep references to `variableGetters` and `storeReference` private.
const variableGetters = {};
let storeReference = null;

class ReactAnalytics {
  /**
   * @param {Store} store
   */
  static use(store) {
    storeReference = store;
  }

  /**
   * @param {String} variable
   * @param {Object} [parameters]
   * @returns {Function}
   */
  static get(variable, parameters) {
    if (variableGetters[variable] && storeReference) {
      return variableGetters[variable](storeReference.getState(), parameters);
    }
    return null;
  }

  /**
   * @param {String|Object} variable
   * @param {Function} [variableGetter]
   */
  static set(variable, variableGetter) {
    if (typeof variable === 'string' && typeof variableGetter === 'function') {
      variableGetters[variable] = variableGetter;
    } else if (typeof variable === 'object') {
      const variableKeys = Object.keys(variable);
      variableKeys.forEach((variableKey) => {
        if (typeof variable[variableKey] === 'function') {
          variableGetters[variableKey] = variable[variableKey];
        }
      });
    }
  }

  /**
   * @param {String} customEvent
   * @param {Object} data
   */
  static trigger(customEvent, data) {
    if (typeof dataLayer !== 'undefined') {
      dataLayer.push({
        event: customEvent,
        ...data
      });
    }
  }

  /**
   * @param {Object} param
   * @param {String} param.type Type of the DOM Event to watch for.
   * @param {String} param.customEventName Custom Event name to be trigger
   *                                       on GTM on successful capture.
   * @param {Function} [param.validator] Validator function to be used in case
   *                                     you want to add special conditions
   *                                     on filtering some events.
   */
  static watchDOMEvent({ type, customEventName, validator }) {
    document.addEventListener(type, (event) => {
      const { target } = event;
      const analyticsID = target.getAttribute('data-analytics-id');

      if (analyticsID && validator(event)) {
        ReactAnalytics.trigger(customEventName, {
          'domEvent.target.analyticsID': analyticsID,
          'domEvent.target.analyticsData': target.getAttribute('data-analytics-data') || null,
          // NOTE: Not to be used.
          'domEvent.target.id': target.id || null,
          // NOTE: Only to be used to perform filtering if absolutely required.
          'domEvent.target.className': target.className || null,
          'domEvent.target.value': target.value || null,
          'domEvent.target.href': target.href || null,
          'domEvent.event': event
        });
      }
    });
  }
}

// Capture all of the API calls for triggers in GTM.
axios.interceptors.response.use((response) => {
  if (response.config.analyticsID) {
    ReactAnalytics.trigger('apiResponse', {
      apiAnalyticsID: response.config.analyticsID,
      apiMeta: response.config.meta,
      apiData: response.data,
      apiStatus: response.status,
      apiURL: response.request.responseURL
    });
  }

  return response;
});

ReactAnalytics.watchDOMEvent({
  type: 'keydown',
  customEventName: 'keyEnter',
  validator: ({ which, keyCode }) => (which || keyCode) === 13
});

// Expose our `ReactAnalytics` object to the GTM.
window.ReactAnalytics = ReactAnalytics;

export default ReactAnalytics;
