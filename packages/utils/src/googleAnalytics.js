import ReactGA from 'react-ga';

export const GAInitialize = (TRACKING_ID) => {
  ReactGA.initialize(TRACKING_ID);
};

export const useAnalyticsEventTracker = (
  action = 'test action',
  category = 'Blog category',
  label = 'test label'
) => {
  ReactGA.event({ action, category, label });
};
