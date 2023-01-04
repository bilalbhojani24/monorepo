export const raiseSentryError = (e, additionalData = {}) => {
  const { Sentry } = window;
  if (typeof Sentry !== 'undefined') {
    Sentry.captureException(e, additionalData);
  }
};
