import amplitude from 'amplitude-js';

export const initAmplitude = (API_KEY) => {
  amplitude.getInstance().init(API_KEY);
};

export const setAmplitudeUserDevice = (installationToken) => {
  amplitude.getInstance().setDeviceId(installationToken);
};

export const setAmplitudeUserId = (userId) => {
  amplitude.getInstance().setUserId(userId);
};

export const setAmplitudeUserProperties = (properties) => {
  amplitude.getInstance().setUserProperties(properties);
};

export const sendAmplitudeData = (eventType, eventProperties) => {
  amplitude.getInstance().logEvent(eventType, eventProperties);
};
