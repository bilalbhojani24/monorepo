// const Sentry = require('@sentry/react');
import * as Sentry from '@sentry/react';

let initialized;
const checkIfInitialized = () => {
  if (!initialized) throw new Error('Sentry not initialised!');
};

export const initSentry = (config) => {
  // Config structure
  // - dsn(string): A key that will be unique to each project, generated from sentry to identify where actually sdk will send the error data.
  // - debug(boolean): This is to run sentry in debug mode. Can be mostly enabled for regression envs but will be false for production env.
  // - release(string): This will denote the release version of the product.
  // - environment(string): This will have a custom env name
  // - sampleRate(number): This will be the sampling rate of the errors sent to the sentry. Can be in the range of 0.1 to 1 and each individual team can set the number based on the requirement and count of errors.
  // - allowUrls(Array(string): Devs can pass a number of URLs/regex for the sentry to allow logging errors from only a specific set of URLs.
  // - denyUrls(Array(string): Devs can pass a list of URLs/regex that needs to be excluded for the project. This list will be appended on top of the default deny URLs that the sentry suggests adding.
  // - browserSupport(object) : This will be an object of the browser that specific code support. Numbers considered as latest - <number> of versions are supported

  initialized = true;
  Sentry.init(config);
};

export const addErrorProcessor = (callback) => {
  checkIfInitialized();
  // This function will be called with an event object that the sentry provides and a hint object
  // which will contain the breadcrumbs-related information.
  Sentry.withScope((scope) => {
    scope.addEventProcessor((event, hint) => callback(event, hint));
  });
};

export const captureErrorWithTag = (errorObject, tag, extraOptions) => {
  checkIfInitialized();
  Sentry.withScope((scope) => {
    if (extraOptions) scope.setExtras(extraOptions);
    if (tag) scope.setTag('custom-tag', tag);
    Sentry.captureException(errorObject);
  });
};

export const setUserContext = (id) => {
  checkIfInitialized();
  Sentry.setUser({ id });
};
