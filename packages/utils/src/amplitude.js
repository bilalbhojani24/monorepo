import amplitude from 'amplitude-js';

class Amplitude {
  constructor(KEY) {
    amplitude.getInstance().init(KEY);
    this.LogAmplitudeEvent = this.LogAmplitudeEvent.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  LogAmplitudeEvent(key, data, cb) {
    amplitude.getInstance().logEvent(key, data, cb);
  }
}

export default Amplitude;
