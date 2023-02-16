import ReactGA from 'react-ga4';

class Analytics {
  constructor(TRACKING_ID) {
    ReactGA.initialize(TRACKING_ID);
  }

  // eslint-disable-next-line class-methods-use-this
  analyticsEventTracker(category, action, label) {
    ReactGA.event({ category, action, label });
  }
}

export default Analytics;
