import ReactGA from 'react-ga4';

let initialized = false;
export const initGA = (trackingId) => {
  initialized = true;
  ReactGA.initialize(trackingId);
};

export const logAnalyticsEvent = (category, action, label) => {
  if (!initialized) throw new Error('Google Analytics not initialised');
  ReactGA.event({ category, action, label });
};
