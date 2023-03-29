import { REPORT_LOADING_STATES } from 'constants/mcpConstants';

export const sessionStateTextMap = {
  [REPORT_LOADING_STATES.CONNECTING]: `AppBench is warming up...`,
  [REPORT_LOADING_STATES.LAUNCHING]: `AppBench is warming up...`,
  [REPORT_LOADING_STATES.RECORDING]:
    'App profiling started.\nManually navigate critical app user journeys on the connected device.',
  [REPORT_LOADING_STATES.STOPPING]:
    'Almost there! AppBench is generating your report…\nEnsure the device remains connected.'
};

export const generateTestDataDescriptionList = (deviceDetails) => [
  {
    title: 'Device Model',
    description: deviceDetails?.name || 'N.A'
  },
  {
    title: 'OS Version',
    description: deviceDetails?.osVersion || 'N.A'
  },
  {
    title: 'Screen Resolution',
    description: deviceDetails?.resolution || 'N.A'
  },
  {
    title: 'CPU',
    description: deviceDetails?.cpu || 'N.A'
  },
  {
    title: 'RAM',
    description: deviceDetails?.ram || 'N.A'
  },
  {
    title: 'Network',
    description: 'N.A'
  }
];

export const cycledTipMessages = [
  '21% decrease in Android app startup time led to 5% increase in driver sessions for Lyft.',
  'Reducing Jank issues led to 50% increase in user interaction for Swiggy',
  'Lowering ANRs led to 40% reduction in user complaints for MyJio app'
];
