/* eslint-disable sonarjs/cognitive-complexity */
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
  initAmplitude(initArgs.amplitudeConfig);
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
    const logData = data || {};
    // Check to exclude data which is not of type object
    if (!(typeof logData === 'object' && !Array.isArray(logData))) {
      return;
    }
    logData.url = window.location.href;
    // For GDPR
    delete logData.email;
    /*
      The below chunk appends the value of `team` for each event that is being sent for L/AL/A/AA
      All new events that are being sent post 1st March 2021, will be dropped if the `team` key is missing
     */
    // Note: Checking for data.team as Product's like Speedlad use GTM directly to send events
    logData.team = logData.team || eventType;
    if (!skipLoggingKeys.includes('amplitude')) {
      LogAmplitudeEvent(key, logData, cb);
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
            logData.params = paramsValue;
          }
        }
      } catch (e) {
        throw new Error(e);
      }
    }

    if (!skipLoggingKeys.includes('EDS')) {
      logEDSEvent(key, eventType, logData);
    }
    if (sendToGA === true) {
      logAnalyticsEvent(logData.team || '', key, logData.label || '');
    }
  }
};
