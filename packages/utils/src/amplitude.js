import amplitude from 'amplitude-js';

let initialized = false;
export const initAmplitude = (config) => {
  initialized = true;
  amplitude.getInstance().init(config.key);

  if (config?.userData) {
    try {
      amplitude.getInstance().setUserId(config.userData.user_id);
      amplitude.getInstance().setUserProperties(config.userData);
    } catch (error) {
      throw new Error(`Amplitude failed to setup user data ${error}`);
    }
  }

  if (config?.groupData) {
    const amplitudeClient = amplitude.getInstance();
    amplitudeClient.setGroup('Group', `${config.groupData.group_id}`);
    const identify = new amplitude.Identify();
    for (
      let i = 0, keys = Object.keys(config.groupData);
      i < keys.length;
      i += 1
    ) {
      identify.set(keys[i], config.groupData[keys[i]]);
    }
    amplitudeClient.groupIdentify(
      'Group',
      `${config.groupData.group_id}`,
      identify
    );
  }
};

export const LogAmplitudeEvent = (key, data, cb) => {
  if (!initialized) throw new Error('Amplitude not initialised');
  amplitude.getInstance().logEvent(key, data, cb);
};
