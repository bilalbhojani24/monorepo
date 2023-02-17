import amplitude from 'amplitude-js';

let initialized = false;
export const initAmplitude = (key) => {
  initialized = true;
  amplitude.getInstance().init(key);
};

export const LogAmplitudeEvent = (key, data, cb) => {
  if (!initialized) throw new Error('Amplitude not initialised');
  amplitude.getInstance().logEvent(key, data, cb);
};
