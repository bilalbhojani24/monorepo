import amplitude from 'amplitude-js';

let initialized = false;
export const initAmplitude = (config) => {
  // The structure of amplitude config will look as follows:
  //  amplitudeConfig: {
  //  key: string
  //  userData: object
  //    -userId:string (optional key to be passed)
  //  groupData: object
  //    -groupId:string (optional key to be passed)
  // }
  initialized = true;
  amplitude.getInstance().init(config.key);

  if (config?.userData) {
    try {
      amplitude.getInstance().setUserId(config.userData.userId);
      amplitude.getInstance().setUserProperties(config.userData);
    } catch (error) {
      throw new Error(`Amplitude failed to setup user data ${error}`);
    }
  }

  const amplitudeClient = amplitude.getInstance();
  amplitudeClient.setGroup('Group', `${config.groupData.groupId}`);
  const identify = new amplitude.Identify();

  Object.keys(config.groupData).forEach((configItem) => {
    identify.set(configItem, config.groupData[configItem]);
  });

  amplitudeClient.groupIdentify(
    'Group',
    `${config.groupData.groupId}`,
    identify
  );
};

export const LogAmplitudeEvent = (key, data, cb) => {
  if (!initialized) throw new Error('Amplitude not initialised');
  amplitude.getInstance().logEvent(key, data, cb);
};
