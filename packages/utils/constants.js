export const rateLimitError =
  "Too many requests received from your network, please try again in some time or <a href='https://www.browserstack.com/contact?too_many_requests=true'>contact us</a>";

export const EMAIL_VALIDATION_REGEX =
  /^[a-zA-Z0-9+_|-](?:[.]?[a-zA-Z0-9'+_|~-])*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export const INACTIVITY_TIME_LIMIT = 300000; // 5min

export const DB_NAME = 'BrowserStack';

export const schema = {
  deviceLogs: '[createTimestamp+lineNumber]'
};

export const DB_VERSION = 1;

export const messages = {
  startRecordingError: 'Error in startScreenRecording',
  stopRecordingError: 'Error in stopRecording',
  downloadRecordingError: 'Error in downloadRecording',
  discardRecordingError: 'Error in discardRecording',
  recordingDownloaded: 'recordingDownloaded',
  recordingDiscarded: 'recordingDiscarded'
};

export const EDSThresholdConstants = {
  EDSLiveTestSessionsThrottleThreshold: 100,
  EDSAppLiveTestSessionsThrottleThreshold: 100,
  EDSLiveWebEventsThrottleThreshold: 100,
  EDSAppLiveWebEventsThrottleThreshold: 100,
  EDSAppAutomateWebEventsThrottleThreshold: 100,
  EDSWebEventsThrottleThreshold: 100,
  EDSWebEventsPiiThrottleThreshold: 100,
  EDSCommonThrottleThreshold: 100
};

export const EDSUserDetails = { user_id: 1, group_id: 2 };

export const EdsConfig = {
  api: '',
  server: 10,
  port: 6006
};
