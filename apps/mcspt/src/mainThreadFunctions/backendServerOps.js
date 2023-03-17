const { default: getPort } = require('get-port');

const { spawn } = require('child_process');

const processPaths = {
  pyIos:
    '/Applications/BrowserstackCSPT.app/Contents/Resources/nodeBE/py-ios/server',
  bsPerf:
    '/Applications/BrowserstackCSPT.app/Contents/Resources/nodeBE/mobile-performance/bs-perf-tool'
};

export const initializeBackendServer = () => {
  try {
    const firstAvailablePort = getPort({ port: 8000 });

    spawn(processPaths.pyIos, [firstAvailablePort]);

    const secondAvailablePort = getPort({ port: 3000 });

    spawn(processPaths.bsPerf, [
      '-p',
      secondAvailablePort,
      '-pi',
      firstAvailablePort
    ]);
  } catch (e) {
    // No mechanism at BE to handle logs as of now
  }
};
