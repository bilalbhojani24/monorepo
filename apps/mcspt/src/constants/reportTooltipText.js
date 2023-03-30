export const APP_SIZE_TT = {
  description: 'Measures the App Size after installation on the device.',
  recommend: 'Recommended Threshold <= 100 MB',
  link: ''
};

export const COLD_APP_STARTUP_TT = {
  description:
    'Measures how long it takes for the app to launch and display its first frame or Time to Initial Display (TTID). Calculated by terminating the app and launching a fresh session.',
  recommend: 'Recommended Threshold >= 3000ms ',
  link: ''
};

export const SLOW_FRAMES_TT = {
  description:
    'Measures % of frames taking >= 16.67 ms to render. Assuming 60FPS screen refresh rate.',
  recommend: 'Recommended Threshold >= 25%',
  link: ''
};

export const FROZEN_FRAMES_TT = {
  description:
    'Measures % of frames taking >= 700 ms to render. Assuming 60FPS screen refresh rate.',
  recommend: 'Recommended Threshold >= 0.1%',
  link: ''
};

export const ANR_DETECTED_TT = {
  description:
    'Measures No. of times UI thread is blocked for >= 5s in the session',
  recommend: 'Recommended Threshold = 0',
  link: ''
};

export const ACTIVITY_LOAD_TT = {
  description:
    'Measures how long it takes for an Activity or Screen to load content and become responsive to user input',
  recommend: 'Recommended Threshold >= 1000ms',
  link: ''
};

export const AVG_MEMORY_TT = {
  description:
    'Measures the avg Memory footprint of the app in the test session.',
  recommend: 'Recommended Threshold >= 250MB',
  link: ''
};

export const MAX_MEMORY_TT = {
  description: `Measures the max Memory footprint of the app in the test session.`,
  recommend: '',
  link: ''
};

export const AVG_CPU_TT = {
  description: `Measures the avg CPU usage of the app in the test session.`,
  recommend: 'Recommended Threshold <= 25%',
  link: ''
};

export const MAX_CPU_TT = {
  description: `Measures the peak CPU usage of the app in the test session.`,
  recommend: '',
  link: ''
};

export const BATTERY_CONSUMED_TT = {
  description: `Measures the % of battery capacity consumed by the app in the session. Calculated by dividing total battery discharged (mAh) over Device's Battery Capacity.`,
  recommend: 'Recommended Threshold <= 0.5% per min',
  link: ''
};

export const DISK_READ_TT = {
  description: `Measures the amount of data the app reads from the device's disk during the session.`,
  recommend: 'Recommended Threshold <= 20MB',
  link: ''
};

export const DISK_WRITE_TT = {
  description: `Measures the amount of data the app writes to the device's disk during the session.`,
  recommend: 'Recommended Threshold <= 20MB',
  link: ''
};

export const NETWORK_UPLOAD_TT = {
  description: `Measures the amount of data the app uploads via the network during the session.`,
  recommend: 'Recommended Threshold <= 20,000 KB ',
  link: ''
};

export const NETWORK_DOWNLOAD_TT = {
  description: `Measures the amount of data the app downloads via the network during the session.`,
  recommend: 'Recommended Threshold <= 20,000 KB ',
  link: ''
};
