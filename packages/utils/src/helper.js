import { EMAIL_VALIDATION_REGEX } from '../constants';

export const getInitialAndFinalFocusableElement = (element) => {
  const querySelectorToTargetFocusableElements =
    "input, button, [role='button'], [role='link'], a, select, textarea";
  if (!element) {
    return [null];
  }
  const focusableElements = [
    ...element.querySelectorAll(querySelectorToTargetFocusableElements)
  ];
  return focusableElements.length
    ? [focusableElements.shift(), focusableElements.pop()]
    : [null];
};

export const trapFocusInElement = (
  event,
  parentElement,
  firstElement = null,
  lastElement = null
) => {
  /*
    We can avoid getting initial and final focusable element
    on every keydown if we know that initial and final dom nodes will
    not change if state change happens in the modal
    */
  let firstFocusElement = firstElement;
  let lastFocusedElement = lastElement;
  if (!firstElement || !lastElement) {
    [firstFocusElement, lastFocusedElement] =
      getInitialAndFinalFocusableElement(parentElement);
  }
  if (!firstFocusElement || !lastFocusedElement) {
    return false;
  }
  if (event.key === 'Tab' || event.keyCode === 9) {
    if (event.shiftKey) {
      if (document.activeElement === firstFocusElement) {
        lastFocusedElement.focus();
        event.preventDefault();
      }
    } else if (document.activeElement === lastFocusedElement) {
      firstFocusElement.focus();
      event.preventDefault();
    }
  }
  return false;
};

export const getUtmData = (dataMap) => ({
  utm_source: dataMap.utm_source,
  utm_medium: dataMap.utm_medium,
  utm_platform: dataMap.utm_platform,
  utm_content: dataMap.utm_content,
  utm_campaign: dataMap.utm_campaign,
  utm_campaigncode: dataMap.utm_campaigncode,
  utm_term: dataMap.utm_term
});

export const utmDataMap = (queryString) => {
  const utmData = {};
  const queryData = queryString.replace('?', '').split('&').filter(Boolean);
  for (let i = 0; i < queryData.length; i += 1) {
    const [key, value] = queryData[i].split('=');
    utmData[key] = value;
  }
  const utmDataObj = getUtmData(utmData);
  Object.keys(utmDataObj).forEach(
    (key) => utmDataObj[key] === undefined && delete utmDataObj[key]
  );
  return utmDataObj;
};

export const validateEmail = (string) => EMAIL_VALIDATION_REGEX.test(string);

/**
 *
 * @param {* String} eventName
 * @param {* Object} eventObj
 * @param {* Array} skipLoggingKeys
 * Note: `skipLoggingKeys` is used to store the services where you don't want to send the event data to.
 * For Example if you you don't want to send the data to eds pass it value as ['EDS']
 * Same if you you don't want to send the data to amplitude pass it value as ['amplitude']
 * And if you want to send data to both eds as well as amplitude don't pass this value simply keep it as empty array
 * cb is used to execute any callback method once amplitude event is sent
 * sendToGA is used to send the web event to GA
 */
export const webEventTracker = (
  eventName,
  eventObj = {},
  skipLoggingKeys = [],
  cb = null,
  sendToGA = false
) => {
  if (window.WebEventTracker && window.EDS) {
    window.WebEventTracker.logEvent(
      skipLoggingKeys,
      window.EDS.webEvents,
      eventName,
      eventObj,
      cb,
      sendToGA
    );
  }
};
