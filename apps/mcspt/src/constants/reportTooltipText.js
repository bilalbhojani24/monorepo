export const APP_SIZE_TT = {
  analyticsTitle: 'APP_SIZE',
  description: 'Measures the App Size after installation on the device.',
  recommend: 'Recommended Threshold <= 100 MB',
  link: ''
};

export const COLD_APP_STARTUP_TT = {
  analyticsTitle: 'COLD_APP_STARTUP',
  description:
    'Measures how long it takes for the app to launch and display its first frame or Time to Initial Display (TTID). Calculated by terminating the app and launching a fresh session.',
  recommend: 'Recommended Threshold <= 3000ms ',
  link: ''
};

export const SLOW_FRAMES_TT = {
  analyticsTitle: 'SLOW_FRAMES',
  description:
    'Measures % of frames taking >= 16.67 ms to render. Assuming 60FPS screen refresh rate.',
  recommend: 'Recommended Threshold <= 25%',
  link: ''
};

export const FROZEN_FRAMES_TT = {
  analyticsTitle: 'FROZEN_FRAMES',
  description:
    'Measures % of frames taking >= 700 ms to render. Assuming 60FPS screen refresh rate.',
  recommend: 'Recommended Threshold <= 0.1%',
  link: ''
};

export const ANR_DETECTED_TT = {
  analyticsTitle: 'ANR_DETECTED',
  description:
    'Measures No. of times UI thread is blocked for >= 5s in the session',
  recommend: 'Recommended Threshold = 0',
  link: ''
};

export const ACTIVITY_LOAD_TT = {
  analyticsTitle: 'ACTIVITY_LOAD',
  description:
    'Measures how long it takes for an Activity or Screen to load content and become responsive to user input',
  recommend: 'Recommended Threshold >= 1000ms',
  link: ''
};

export const AVG_MEMORY_TT = {
  analyticsTitle: 'AVG_MEMORY',
  description:
    'Measures the avg Memory footprint of the app in the test session.',
  recommend: 'Recommended Threshold <= 250MB',
  link: ''
};

export const MAX_MEMORY_TT = {
  analyticsTitle: 'MAX_MEMORY',
  description: `Measures the max Memory footprint of the app in the test session.`,
  recommend: '',
  link: ''
};

export const AVG_CPU_TT = {
  analyticsTitle: 'AVG_CPU',
  description: `Measures the avg CPU usage of the app in the test session.`,
  recommend: 'Recommended Threshold <= 20%',
  link: ''
};

export const MAX_CPU_TT = {
  analyticsTitle: 'MAX_CPU',
  description: `Measures the peak CPU usage of the app in the test session.`,
  recommend: '',
  link: ''
};

export const BATTERY_CONSUMED_TT = {
  analyticsTitle: 'BATTERY_CONSUMED',
  description: `Measures the % of battery capacity consumed by the app in the session. Calculated by dividing total battery discharged (mAh) over Device's Battery Capacity.`,
  recommend: 'Recommended Threshold <= 0.5% per min',
  link: ''
};

export const DISK_READ_TT = {
  analyticsTitle: 'DISK_READ',
  description: `Measures the amount of data the app reads from the device's disk during the session.`,
  recommend: 'Recommended Threshold <= 100MB',
  link: ''
};

export const DISK_WRITE_TT = {
  analyticsTitle: 'DISK_WRITE',
  description: `Measures the amount of data the app writes to the device's disk during the session.`,
  recommend: 'Recommended Threshold <= 20MB',
  link: ''
};

export const NETWORK_UPLOAD_TT = {
  analyticsTitle: 'NETWORK_UPLOAD',
  description: `Measures the amount of data the app uploads via the network during the session.`,
  recommend: 'Recommended Threshold <= 5,000 Kb ',
  link: ''
};

export const NETWORK_DOWNLOAD_TT = {
  analyticsTitle: 'NETWORK_DOWNLOAD',
  description: `Measures the amount of data the app downloads via the network during the session.`,
  recommend: 'Recommended Threshold <= 20,000 Kb ',
  link: ''
};
