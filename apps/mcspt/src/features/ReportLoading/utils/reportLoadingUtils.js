import REPORT_LOADING_STATES from 'constants/reportLoadingStates';

export const sessionStateTextMap = {
  [REPORT_LOADING_STATES.CONNECTING]: `BrowserStack AppPerformance is warming up...`,
  [REPORT_LOADING_STATES.LAUNCHING]: `BrowserStack AppPerformance is warming up...`,
  [REPORT_LOADING_STATES.RECORDING]:
    'App profiling started.\nManually navigate critical app user journeys on the connected device.',
  [REPORT_LOADING_STATES.STOPPING]:
    'Almost there! BrowserStack AppPerformance is generating your report…\nEnsure the device remains connected.',
  [REPORT_LOADING_STATES.COMPLETE]:
    'Almost there! BrowserStack AppPerformance is generating your report…\nEnsure the device remains connected.'
};

export const generateTestDataDescriptionList = (deviceDetails) => [
  {
    label: 'Device Model',
    value: deviceDetails?.name || 'N.A'
  },
  {
    label: 'OS Version',
    value: deviceDetails?.osVersion || 'N.A'
  },
  {
    label: 'Screen Resolution',
    value: deviceDetails?.resolution || 'N.A'
  },
  {
    label: 'CPU',
    value: deviceDetails?.cpu || 'N.A'
  },
  {
    label: 'RAM',
    value: deviceDetails?.ram || 'N.A'
  },
  {
    label: 'Network',
    value: 'N.A'
  }
];

export const cycledTipMessages = [
  '21% decrease in Android app startup time led to 5% increase in driver sessions for Lyft.',
  'Reducing Jank issues led to 50% increase in user interaction for Swiggy',
  'Lowering ANRs led to 40% reduction in user complaints for MyJio app'
];
