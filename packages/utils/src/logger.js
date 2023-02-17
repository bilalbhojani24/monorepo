/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-param-reassign */

import { initAmplitude, LogAmplitudeEvent } from './amplitude';
import { initEDS, logEDSEvent } from './eds';
import { initGA, logAnalyticsEvent } from './googleAnalytics';

const whiteListUrl = [
  '/pricing',
  '/contact',
  '/accounts/subscriptions',
  '/accounts/manage-users'
];

let baseLogger;

export const initLogger = (initArgs) => {
  baseLogger = initArgs;
  initAmplitude(initArgs.amplitudeKey);
  initGA(initArgs.analyticsKey);
  initEDS(initArgs.EDSDetails);
};

export const logEvent = (
  skipLoggingKeys,
  eventType,
  key,
  data,
  cb,
  sendToGA
) => {
  if (baseLogger !== undefined) {
    data = data || {};
    // Check to exclude data which is not of type object
    if (!(typeof data === 'object' && !Array.isArray(data))) {
      return;
    }
    data.url = window.location.href;
    // For GDPR
    delete data.email;
    /*
      The below chunk appends the value of `team` for each event that is being sent for L/AL/A/AA
      All new events that are being sent post 1st March 2021, will be dropped if the `team` key is missing
     */
    // Note: Checking for data.team as Product's like Speedlad use GTM directly to send events
    data.team = data.team || eventType;
    if (skipLoggingKeys.indexOf('amplitude') === -1) {
      LogAmplitudeEvent(key, data, cb);
    }
    // Add Query parameter in json in event data with name of "params"
    if (window.location.search !== '') {
      try {
        const searchLocation = window.location.search.substring(1);
        const paramsValue = {};
        const whiteListParams = [
          'utm_campaign',
          'utm_content',
          'utm_keyword',
          'utm_medium',
          'utm_source',
          'utm_term'
        ];
        const paramsObj = JSON.parse(
          `{"${searchLocation.replace(/&/g, '","').replace(/=/g, '":"')}"}`,
          (paramsObjKey, value) =>
            paramsObjKey === '' ? value : decodeURIComponent(value)
        );
        if (whiteListUrl.indexOf(window.location.pathname) !== -1) {
          // check white list params
          Object.keys(paramsObj).forEach((ObjectKey) => {
            if (whiteListParams.indexOf(ObjectKey) > -1) {
              paramsValue[ObjectKey] = paramsObj[ObjectKey];
            }
          });
          // if params set then add params props
          if (Object.keys(paramsValue).length > 0) {
            data.params = paramsValue;
          }
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    }
    if (key === 'NewSignup') {
      data.user = {
        user_id: data.user_id,
        type: data.user_type,
        plan_id: data.plan_id,
        group_id: data.group_id
      };
    }
    if (skipLoggingKeys.indexOf('EDS') === -1) {
      logEDSEvent(key, eventType, data);
    }
    if (sendToGA === true && key) {
      logAnalyticsEvent(data.team || '', key, data.label || '');
    }
  }
};
