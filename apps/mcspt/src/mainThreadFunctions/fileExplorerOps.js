const { protocol } = require('electron');

const PROTOCOL_NAME = 'securefileprotocol';
const PROTOCOL = `${PROTOCOL_NAME}://`;

const readFileFromLocalDisk = (req, callback) => {
  const filePath = `${req.url.slice(PROTOCOL.length)}`;

  callback({
    path: filePath
  });
};

const initializeProtocolForFileRead = () => {
  protocol.registerFileProtocol(PROTOCOL_NAME, readFileFromLocalDisk);
};

const initializeSchemeForFileRead = () => {
  protocol.registerSchemesAsPrivileged([
    {
      scheme: PROTOCOL_NAME,
      privileges: {
        bypassCSP: true
      }
    }
  ]);
};

module.exports = {
  initializeProtocolForFileRead,
  initializeSchemeForFileRead
};
