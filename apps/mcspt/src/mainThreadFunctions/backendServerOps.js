const { default: getPort } = require('get-port');

const { spawn } = require('child_process');

const processPaths = {
  pyIos:
    '/Applications/BrowserstackCSPT.app/Contents/Resources/nodeBE/py-ios/server',
  bsPerf:
    '/Applications/BrowserstackCSPT.app/Contents/Resources/nodeBE/mobile-performance/bs-perf-tool'
};

export const initializeBackendServer = async (mainThreadGlobals) => {
  try {
    const firstAvailablePort = await getPort({ port: 8000 });

    await spawn(processPaths.pyIos, [firstAvailablePort]);

    const secondAvailablePort = await getPort({ port: 3000 });

    await spawn(processPaths.bsPerf, [
      'server',
      '-p',
      secondAvailablePort,
      '-pi',
      firstAvailablePort
    ]);

    mainThreadGlobals.mainWindow.webContents.send(
      'save-bs-perf-port',
      secondAvailablePort
    );
  } catch (e) {
    // No mechanism at BE to handle logs as of now
  }
};
