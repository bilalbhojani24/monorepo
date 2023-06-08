export const isMacMachine = process.platform === 'darwin';

export const isWindowsMachine = process.platform?.slice(0, 3) === 'win';

export const getProcessPathsForMac = () => {
  const binIndexforMac = process.execPath.lastIndexOf('/');
  const binPathForMac = process.execPath.substring(0, binIndexforMac);

  return IS_DEV
    ? {
        pyIos: `${process.cwd()}/nodeBE/py-ios/server`,
        bsPerf: `${process.cwd()}/nodeBE/mobile-performance/bs-perf-tool`
      }
    : {
        pyIos: `${binPathForMac}/../Resources/nodeBE/py-ios/server`,
        bsPerf: `${binPathForMac}/../Resources/nodeBE/mobile-performance/bs-perf-tool`
      };
};

export const getProcessPathsForWindows = () => {
  const binIndex = process.execPath.lastIndexOf('\\');
  const binPath = process.execPath.substring(0, binIndex);

  return IS_DEV
    ? {
        bsPerf: `${process.cwd()}/nodeBE/mobile-performance/bs-perf-tool`
      }
    : {
        bsPerf: `${binPath}/resources/nodeBE/mobile-performance/bs-perf-tool`
      };
};
