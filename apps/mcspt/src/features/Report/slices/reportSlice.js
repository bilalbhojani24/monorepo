import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sessionData: {
    status: 'success',
    report: {
      'App Startup': { appStartTotalTime: 5763, appStartType: 'cold' },
      'Screen Load': {
        metrics: [
          {
            activityName:
              'com.application.zomato/com.application.zomato.login.ZomatoActivity',
            timeData: [{ startTime: 10033, renderTime: 1026 }],
            avg: 1026,
            max: 1026
          },
          {
            activityName:
              'com.application.zomato/com.application.zomato.tabbed.home.HomeActivity',
            timeData: [
              { startTime: 19469, renderTime: 10471 },
              { startTime: 39725, renderTime: 540 }
            ],
            avg: 5505.5,
            max: 10471
          },
          {
            activityName:
              'com.application.zomato/com.application.zomato.location.search.ConsumerLocationSearchActivity',
            timeData: [{ startTime: 35444, renderTime: 4167 }],
            avg: 4167,
            max: 4167
          }
        ]
      },
      Memory: {
        metrics: [
          { ts: 9974, memoryMB: 137.769 },
          { ts: 11775, memoryMB: 151.995 },
          { ts: 13043, memoryMB: 150.005 },
          { ts: 14496, memoryMB: 149.755 },
          { ts: 15772, memoryMB: 149.071 },
          { ts: 18395, memoryMB: 158.252 },
          { ts: 21106, memoryMB: 146.458 },
          { ts: 23153, memoryMB: 175.774 },
          { ts: 24978, memoryMB: 182.471 },
          { ts: 30672, memoryMB: 196.236 },
          { ts: 32170, memoryMB: 193.906 },
          { ts: 33542, memoryMB: 193.751 },
          { ts: 35238, memoryMB: 198.185 },
          { ts: 37862, memoryMB: 205.509 },
          { ts: 39913, memoryMB: 204.161 },
          { ts: 41263, memoryMB: 203.426 },
          { ts: 42896, memoryMB: 167.938 }
        ],
        metadata: { memoryUsageMb: { max: 205.509, avg: 174.392 } }
      },
      CPU: {
        metrics: [
          { ts: 11220, cpuUsagePercentage: 10.47, cpuThreads: 147 },
          { ts: 12269, cpuUsagePercentage: 1.87, cpuThreads: 146 },
          { ts: 13347, cpuUsagePercentage: 0, cpuThreads: 146 },
          { ts: 14442, cpuUsagePercentage: 1.64, cpuThreads: 146 },
          { ts: 15832, cpuUsagePercentage: 3.14, cpuThreads: 146 },
          { ts: 17771, cpuUsagePercentage: 8.92, cpuThreads: 149 },
          { ts: 19279, cpuUsagePercentage: 15.8, cpuThreads: 155 },
          { ts: 20888, cpuUsagePercentage: 11.84, cpuThreads: 156 },
          { ts: 22044, cpuUsagePercentage: 10.7, cpuThreads: 162 },
          { ts: 23337, cpuUsagePercentage: 17.22, cpuThreads: 169 },
          { ts: 27278, cpuUsagePercentage: 9.56, cpuThreads: 167 },
          { ts: 28888, cpuUsagePercentage: 19.23, cpuThreads: 168 },
          { ts: 30093, cpuUsagePercentage: 16.7, cpuThreads: 168 },
          { ts: 31145, cpuUsagePercentage: 3.63, cpuThreads: 168 },
          { ts: 32278, cpuUsagePercentage: 1.53, cpuThreads: 168 },
          { ts: 33363, cpuUsagePercentage: 4.85, cpuThreads: 168 },
          { ts: 34398, cpuUsagePercentage: 4.25, cpuThreads: 167 },
          { ts: 35545, cpuUsagePercentage: 5.06, cpuThreads: 169 },
          { ts: 36902, cpuUsagePercentage: 11.4, cpuThreads: 168 },
          { ts: 37963, cpuUsagePercentage: 7.59, cpuThreads: 188 },
          { ts: 39500, cpuUsagePercentage: 10.78, cpuThreads: 188 },
          { ts: 40636, cpuUsagePercentage: 5.14, cpuThreads: 187 },
          { ts: 41802, cpuUsagePercentage: 1.88, cpuThreads: 186 },
          { ts: 43057, cpuUsagePercentage: 3.13, cpuThreads: 186 },
          { ts: 44216, cpuUsagePercentage: 4.26, cpuThreads: 186 }
        ],
        metadata: {
          cpuUsagePercentage: { max: 19.23, avg: 7.624 },
          cpuActiveThread: { max: 188, avg: 166.16 }
        }
      },
      Network: {
        metrics: [
          { ts: 11641, networkReadKb: 6.779, networkWriteKb: 4.278 },
          { ts: 12906, networkReadKb: 0, networkWriteKb: 0 },
          { ts: 14167, networkReadKb: 0, networkWriteKb: 0 },
          { ts: 15723, networkReadKb: 0, networkWriteKb: 0 },
          { ts: 17814, networkReadKb: 4.52, networkWriteKb: 1.261 },
          { ts: 19633, networkReadKb: 13.966, networkWriteKb: 9.273 },
          { ts: 21251, networkReadKb: 12.6, networkWriteKb: 14.362 },
          { ts: 22648, networkReadKb: 20.434, networkWriteKb: 8.212 },
          { ts: 26637, networkReadKb: 28.23, networkWriteKb: 16.98 },
          { ts: 28693, networkReadKb: 1.121, networkWriteKb: 2.809 },
          { ts: 29992, networkReadKb: 0.737, networkWriteKb: 0.371 },
          { ts: 31277, networkReadKb: 15.224, networkWriteKb: 12.77 },
          { ts: 32522, networkReadKb: 0.054, networkWriteKb: 0.111 },
          { ts: 33942, networkReadKb: 0, networkWriteKb: 0 },
          { ts: 35241, networkReadKb: 0, networkWriteKb: 0 },
          { ts: 36707, networkReadKb: 6.842, networkWriteKb: 8.409 },
          { ts: 38033, networkReadKb: 0, networkWriteKb: 0 },
          { ts: 39556, networkReadKb: 0, networkWriteKb: 0.194 },
          { ts: 40907, networkReadKb: 0, networkWriteKb: 0 },
          { ts: 42277, networkReadKb: 0, networkWriteKb: 0 },
          { ts: 43635, networkReadKb: 0, networkWriteKb: 0 },
          { ts: 45442, networkReadKb: 7.329, networkWriteKb: 1.47 }
        ],
        metadata: {
          networkReadKb: { total: 117.836 },
          networkWriteKb: { total: 80.5 }
        }
      },
      Battery: {
        metrics: [
          { ts: 9916, batteryPercentage: 100 },
          { ts: 11105, batteryPercentage: 100 },
          { ts: 12196, batteryPercentage: 100 },
          { ts: 13312, batteryPercentage: 100 },
          { ts: 14417, batteryPercentage: 100 },
          { ts: 15632, batteryPercentage: 100 },
          { ts: 17012, batteryPercentage: 100 },
          { ts: 18547, batteryPercentage: 100 },
          { ts: 19833, batteryPercentage: 100 },
          { ts: 21525, batteryPercentage: 100 },
          { ts: 22868, batteryPercentage: 100 },
          { ts: 24793, batteryPercentage: 100 },
          { ts: 28338, batteryPercentage: 100 },
          { ts: 29593, batteryPercentage: 100 },
          { ts: 30733, batteryPercentage: 100 },
          { ts: 31867, batteryPercentage: 100 },
          { ts: 32995, batteryPercentage: 100 },
          { ts: 34121, batteryPercentage: 100 },
          { ts: 35239, batteryPercentage: 100 },
          { ts: 36486, batteryPercentage: 100 },
          { ts: 37694, batteryPercentage: 100 },
          { ts: 39080, batteryPercentage: 100 },
          { ts: 40251, batteryPercentage: 100 },
          { ts: 41405, batteryPercentage: 100 },
          { ts: 42651, batteryPercentage: 100 },
          { ts: 43842, batteryPercentage: 100 },
          { ts: 45076, batteryPercentage: 100 }
        ],
        metadata: { totalBatteryConsumedPercent: 0 }
      },
      Frames: {
        metrics: [
          { ts: 11370, fps: 0, jankyFps: 0 },
          { ts: 12825, fps: 0, jankyFps: 0 },
          { ts: 14065, fps: 0, jankyFps: 0 },
          { ts: 15296, fps: 2, jankyFps: 1 },
          { ts: 17097, fps: 53, jankyFps: 35 },
          { ts: 21381, fps: 0, jankyFps: 0 },
          { ts: 23953, fps: 5, jankyFps: 4 },
          { ts: 28912, fps: 8, jankyFps: 5 },
          { ts: 30751, fps: 0, jankyFps: 0 },
          { ts: 32279, fps: 0, jankyFps: 0 },
          { ts: 33673, fps: 1, jankyFps: 1 },
          { ts: 34976, fps: 2, jankyFps: 2 },
          { ts: 37065, fps: 6, jankyFps: 4 },
          { ts: 39501, fps: 4, jankyFps: 3 },
          { ts: 40748, fps: 0, jankyFps: 0 },
          { ts: 42105, fps: 0, jankyFps: 0 },
          { ts: 43585, fps: 0, jankyFps: 0 },
          { ts: 45014, fps: 0, jankyFps: 0 }
        ],
        metadata: {
          fps: { avg: 4.5 },
          jankyFps: { avg: 3.056 },
          slowFramePercent: 66.49,
          frozenFramePercent: 3.723
        }
      },
      'App size': 28.444,
      ANR: 0,
      'Application Battery': {
        metrics: [
          { ts: 11437, batterymAh: 0.533 },
          { ts: 12672, batterymAh: 0.533 },
          { ts: 13930, batterymAh: 0.533 },
          { ts: 15133, batterymAh: 0.533 },
          { ts: 17637, batterymAh: 0.533 },
          { ts: 20477, batterymAh: 0.533 },
          { ts: 22144, batterymAh: 0.533 },
          { ts: 23497, batterymAh: 0.533 },
          { ts: 28122, batterymAh: 0.534 },
          { ts: 29622, batterymAh: 0.534 },
          { ts: 30966, batterymAh: 0.534 },
          { ts: 32164, batterymAh: 0.534 },
          { ts: 33372, batterymAh: 0.534 },
          { ts: 34746, batterymAh: 0.534 },
          { ts: 36642, batterymAh: 0.534 },
          { ts: 38296, batterymAh: 0.534 },
          { ts: 39805, batterymAh: 0.534 },
          { ts: 41123, batterymAh: 0.534 },
          { ts: 43095, batterymAh: 0.534 },
          { ts: 44515, batterymAh: 0.534 },
          { ts: 45781, batterymAh: 0.534 }
        ],
        metadata: {
          applicationTotalBatteryCapacitymAh: 1000,
          batterymAhConsumedByAppPercent: 0.00010000000000000009
        }
      },
      'Disk IO': {
        metrics: [
          { ts: 10564, diskReadKb: 264183.808, diskWriteKb: 16617.472 },
          { ts: 11893, diskReadKb: 6721.536, diskWriteKb: 360.448 },
          { ts: 13294, diskReadKb: 6721.536, diskWriteKb: 360.448 },
          { ts: 14566, diskReadKb: 6721.536, diskWriteKb: 360.448 },
          { ts: 16348, diskReadKb: 528.384, diskWriteKb: 147.456 },
          { ts: 18270, diskReadKb: 3272.704, diskWriteKb: 798.72 },
          { ts: 19969, diskReadKb: 3489.792, diskWriteKb: 1073.152 },
          { ts: 21850, diskReadKb: 4038.656, diskWriteKb: 1265.664 },
          { ts: 23390, diskReadKb: 20750.336, diskWriteKb: 1646.592 },
          { ts: 27779, diskReadKb: 864.256, diskWriteKb: 847.872 },
          { ts: 29479, diskReadKb: 815.104, diskWriteKb: 258.048 },
          { ts: 30771, diskReadKb: 241.664, diskWriteKb: 184.32 },
          { ts: 32128, diskReadKb: 241.664, diskWriteKb: 184.32 },
          { ts: 33441, diskReadKb: 12.288, diskWriteKb: 49.152 },
          { ts: 34766, diskReadKb: 12.288, diskWriteKb: 49.152 },
          { ts: 36506, diskReadKb: 1994.752, diskWriteKb: 684.032 },
          { ts: 37902, diskReadKb: 4153.344, diskWriteKb: 331.776 },
          { ts: 39538, diskReadKb: 765.952, diskWriteKb: 176.128 },
          { ts: 40933, diskReadKb: 454.656, diskWriteKb: 151.552 },
          { ts: 42445, diskReadKb: 49.152, diskWriteKb: 0 },
          { ts: 43882, diskReadKb: 5709.824, diskWriteKb: 0 },
          { ts: 45497, diskReadKb: 483.328, diskWriteKb: 0 }
        ],
        metadata: {
          diskReadMb: { total: 332.227 },
          diskWriteMb: { total: 25.547 }
        }
      }
    },
    aggregated: {
      appStartTotalTime: { value: 5763 },
      appStartType: { value: 'cold' },
      memoryUsageMbMax: { value: 205.509 },
      memoryUsageMbAvg: { value: 174.392 },
      cpuUsagePercentageMax: { value: 19.23 },
      cpuUsagePercentageAvg: { value: 7.624 },
      cpuActiveThreadMax: { value: 188 },
      cpuActiveThreadAvg: { value: 166.16 },
      networkReadKbTotal: { value: 117.836 },
      networkWriteKbTotal: { value: 80.5 },
      totalBatteryConsumedPercent: { value: 0 },
      fpsAvg: { value: 4.5 },
      jankyFpsAvg: { value: 3.056 },
      slowFramePercent: { value: 66.49 },
      frozenFramePercent: { value: 3.723 },
      anrCount: { value: 0 },
      applicationTotalBatteryCapacitymAh: { value: 1000 },
      batterymAhConsumedByAppPercent: { value: 0.00010000000000000009 },
      diskReadMbTotal: { value: 332.227 },
      diskWriteMbTotal: { value: 25.547 }
    },
    threshold: {
      appStartTotalTime: { operator: 'greaterThan', value: 3 },
      fpsAvg: { operator: 'lessThan', value: 40 },
      jankyFpsAvg: { operator: 'greaterThan', value: 50 },
      frozenFramePercent: { operator: 'greaterThan', value: 0.1 },
      anrCount: { operator: 'greaterThan', value: 1 },
      cpuUsagePercentageAvg: { operator: 'greaterThan', value: 40 },
      cpuUsagePercentageMax: { operator: 'greaterThan', value: 70 },
      memoryUsageMbAvg: { operator: 'greaterThan', value: 250 },
      memoryUsageMbMax: { operator: 'greaterThan', value: 400 },
      diskReadMbTotal: { operator: 'greaterThan', value: 100 },
      diskWriteMbTotal: { operator: 'greaterThan', value: 100 },
      networkReadKbTotal: { operator: 'greaterThan', value: 10 },
      networkWriteKbTotal: { operator: 'greaterThan', value: 20 },
      totalBatteryConsumedPercent: { operator: 'greaterThan', value: 20 }
    },
    startTime: '2023-02-22T10:27:47.000Z',
    endTime: '2023-02-22T10:28:33.000Z',
    device: {
      deviceId: 'emulator-5554',
      name: 'sdk_gphone64_x86_64',
      os: 'android',
      osVersion: '13'
    },
    package: {
      bundleId: 'com.application.zomato',
      name: 'Zomato',
      version: '17.3.1'
    },
    name: 'testing with video',
    metadata: {
      logcat: {
        crash:
          '/Users/ashu/.csp/sessions/282e1a3b-2b65-4e3d-8dfd-78970c6267ec/logcat_crash.txt',
        events:
          '/Users/ashu/.csp/sessions/282e1a3b-2b65-4e3d-8dfd-78970c6267ec/logcat_events.txt',
        main: '/Users/ashu/.csp/sessions/282e1a3b-2b65-4e3d-8dfd-78970c6267ec/logcat_main.txt',
        radio:
          '/Users/ashu/.csp/sessions/282e1a3b-2b65-4e3d-8dfd-78970c6267ec/logcat_radio.txt',
        system:
          '/Users/ashu/.csp/sessions/282e1a3b-2b65-4e3d-8dfd-78970c6267ec/logcat_system.txt'
      },
      diagnostic:
        '/Users/ashu/.csp/sessions/282e1a3b-2b65-4e3d-8dfd-78970c6267ec',
      video:
        '/Users/ashu/.csp/sessions/282e1a3b-2b65-4e3d-8dfd-78970c6267ec/video.mp4'
    }
  },
  latestSeekTimeInSeconds: undefined,
  latestVideoCurrentTimeInSeconds: 0
};

export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    updateSessionMetrics: (state, action) => {
      state.sessionData = action.payload;
    },
    updateLatestSeekTimeInSeconds: (state, action) => {
      let value = action.payload;

      if ((value !== 0 && !!value) || value === 0) {
        value = Math.round(value);
      } else {
        value = undefined;
      }

      state.latestSeekTimeInSeconds = value;
    },
    updateLatestVideoCurrentTimeInSeconds: (state, action) => {
      const value = action.payload;

      if ((value !== 0 && !!value) || value === 0) {
        state.latestVideoCurrentTimeInSeconds = value;
      }
    }
  }
});

export const getSessionMetrics = (state) => state.report.sessionData;
export const getLatestSeekTimeInSeconds = (state) =>
  state.report.latestSeekTimeInSeconds;
export const getLatestVideoCurrentTimeInSeconds = (state) =>
  state.report.latestVideoCurrentTimeInSeconds;

// Action creators are generated for each case reducer function
export const {
  updateSessionMetrics,
  updateLatestSeekTimeInSeconds,
  updateLatestVideoCurrentTimeInSeconds
} = reportSlice.actions;

export default reportSlice.reducer;
