const platformPreloads = require('./platformPreloads');

const generateRemoteThreadProps = () => ({
  platform: platformPreloads.generatePlatformProps()
});

module.exports = {
  generateRemoteThreadProps
};
