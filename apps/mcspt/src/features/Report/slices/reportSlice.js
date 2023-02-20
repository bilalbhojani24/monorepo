import { createSlice } from '@reduxjs/toolkit';

const sessionDataJson = {
  status: 'Session Stopped',
  aggregated: {
    appStartTotalTime: {
      value: 2437
    },
    appStartType: {
      value: 'cold'
    },
    memoryUsageMbMax: {
      value: 52.653
    },
    memoryUsageMbAvg: {
      value: 50.052
    },
    cpuUsagePercentageMax: {
      value: 16.38
    },
    cpuUsagePercentageAvg: {
      value: 3.745
    },
    cpuActiveThreadMax: {
      value: 37
    },
    cpuActiveThreadAvg: {
      value: 33.308
    },
    networkReadKbTotal: {
      value: 30.414
    },
    networkWriteKbTotal: {
      value: 8.473
    },
    totalBatteryConsumedPercent: {
      value: 0
    },
    fpsAvg: {
      value: 8.364
    },
    jankyFpsAvg: {
      value: 2.818
    },
    slowFramePercent: {
      value: 33.33
    },
    frozenFramePercent: {
      value: 1.058
    },
    anrCount: {
      value: 0
    },
    applicationTotalBatteryCapacitymAh: {
      value: 1000
    },
    batterymAhConsumedByAppPercent: {
      value: 0
    },
    diskReadMbTotal: {
      value: 0
    },
    diskWriteMbTotal: {
      value: 0.991
    }
  },
  report: {
    'App Startup': {
      appStartTotalTime: 2437,
      appStartType: 'cold'
    },
    'Screen Load': {
      metrics: [
        {
          activityName: 'org.wikipedia/org.wikipedia.main.MainActivity',
          timeData: [
            {
              startTime: 5337,
              renderTime: 2196
            }
          ],
          avg: 2196,
          max: 2196
        }
      ]
    },
    Memory: {
      metrics: [
        {
          ts: 5202,
          memoryMB: 45.104
        },
        {
          ts: 7290,
          memoryMB: 52.313
        },
        {
          ts: 8555,
          memoryMB: 52.653
        },
        {
          ts: 9786,
          memoryMB: 50.15
        },
        {
          ts: 11150,
          memoryMB: 50.05
        },
        {
          ts: 12284,
          memoryMB: 50.05
        },
        {
          ts: 13440,
          memoryMB: 50.05
        },
        {
          ts: 14659,
          memoryMB: 50.05
        },
        {
          ts: 15803,
          memoryMB: 50.046
        },
        {
          ts: 16993,
          memoryMB: 50.054
        },
        {
          ts: 18138,
          memoryMB: 50.05
        }
      ],
      metadata: {
        memoryUsageMb: {
          max: 52.653,
          avg: 50.052
        }
      }
    },
    CPU: {
      metrics: [
        {
          ts: 6626,
          cpuUsagePercentage: 16.38,
          cpuThreads: 37
        },
        {
          ts: 7681,
          cpuUsagePercentage: 10.06,
          cpuThreads: 33
        },
        {
          ts: 8686,
          cpuUsagePercentage: 7.79,
          cpuThreads: 33
        },
        {
          ts: 9673,
          cpuUsagePercentage: 1.26,
          cpuThreads: 33
        },
        {
          ts: 10662,
          cpuUsagePercentage: 4.59,
          cpuThreads: 33
        },
        {
          ts: 11645,
          cpuUsagePercentage: 0.75,
          cpuThreads: 33
        },
        {
          ts: 12600,
          cpuUsagePercentage: 1.28,
          cpuThreads: 33
        },
        {
          ts: 13607,
          cpuUsagePercentage: 0.25,
          cpuThreads: 33
        },
        {
          ts: 14577,
          cpuUsagePercentage: 1.5,
          cpuThreads: 33
        },
        {
          ts: 15540,
          cpuUsagePercentage: 1.04,
          cpuThreads: 33
        },
        {
          ts: 16515,
          cpuUsagePercentage: 1.54,
          cpuThreads: 33
        },
        {
          ts: 17550,
          cpuUsagePercentage: 0.99,
          cpuThreads: 33
        },
        {
          ts: 19037,
          cpuUsagePercentage: 1.26,
          cpuThreads: 33
        }
      ],
      metadata: {
        cpuUsagePercentage: {
          max: 16.38,
          avg: 3.745
        },
        cpuActiveThread: {
          max: 37,
          avg: 33.308
        }
      }
    },
    Network: {
      metrics: [
        {
          ts: 7076,
          networkReadKb: 8.64,
          networkWriteKb: 2.338
        },
        {
          ts: 8388,
          networkReadKb: 21.61,
          networkWriteKb: 6.063
        },
        {
          ts: 9601,
          networkReadKb: 0.054,
          networkWriteKb: 0.072
        },
        {
          ts: 10808,
          networkReadKb: 0,
          networkWriteKb: 0
        },
        {
          ts: 11990,
          networkReadKb: 0,
          networkWriteKb: 0
        },
        {
          ts: 13168,
          networkReadKb: 0,
          networkWriteKb: 0
        },
        {
          ts: 14308,
          networkReadKb: 0.11,
          networkWriteKb: 0
        },
        {
          ts: 15455,
          networkReadKb: 0,
          networkWriteKb: 0
        },
        {
          ts: 16591,
          networkReadKb: 0,
          networkWriteKb: 0
        },
        {
          ts: 17743,
          networkReadKb: 0,
          networkWriteKb: 0
        },
        {
          ts: 19064,
          networkReadKb: 0,
          networkWriteKb: 0
        }
      ],
      metadata: {
        networkReadKb: {
          total: 30.414
        },
        networkWriteKb: {
          total: 8.473
        }
      }
    },
    Battery: {
      metrics: [
        {
          ts: 5268,
          batteryPercentage: 100
        },
        {
          ts: 6437,
          batteryPercentage: 100
        },
        {
          ts: 7594,
          batteryPercentage: 100
        },
        {
          ts: 8692,
          batteryPercentage: 100
        },
        {
          ts: 9804,
          batteryPercentage: 100
        },
        {
          ts: 10895,
          batteryPercentage: 100
        },
        {
          ts: 11987,
          batteryPercentage: 100
        },
        {
          ts: 13062,
          batteryPercentage: 100
        },
        {
          ts: 14162,
          batteryPercentage: 100
        },
        {
          ts: 15265,
          batteryPercentage: 100
        },
        {
          ts: 16345,
          batteryPercentage: 100
        },
        {
          ts: 17462,
          batteryPercentage: 100
        },
        {
          ts: 18821,
          batteryPercentage: 100
        }
      ],
      metadata: {
        totalBatteryConsumedPercent: 0
      }
    },
    Frames: {
      metrics: [
        {
          ts: 6659,
          fps: 46,
          jankyFps: 15
        },
        {
          ts: 8067,
          fps: 23,
          jankyFps: 9
        },
        {
          ts: 9355,
          fps: 12,
          jankyFps: 1
        },
        {
          ts: 10498,
          fps: 11,
          jankyFps: 6
        },
        {
          ts: 11688,
          fps: 0,
          jankyFps: 0
        },
        {
          ts: 12873,
          fps: 0,
          jankyFps: 0
        },
        {
          ts: 14032,
          fps: 0,
          jankyFps: 0
        },
        {
          ts: 15164,
          fps: 0,
          jankyFps: 0
        },
        {
          ts: 16330,
          fps: 0,
          jankyFps: 0
        },
        {
          ts: 17484,
          fps: 0,
          jankyFps: 0
        },
        {
          ts: 18748,
          fps: 0,
          jankyFps: 0
        }
      ],
      metadata: {
        fps: {
          avg: 8.364
        },
        jankyFps: {
          avg: 2.818
        },
        slowFramePercent: 33.33,
        frozenFramePercent: 1.058
      }
    },
    'App size': 16.232,
    ANR: 0,
    'Application Battery': {
      metrics: [
        {
          ts: 6260,
          batterymAh: 4.82
        },
        {
          ts: 7800,
          batterymAh: 4.82
        },
        {
          ts: 9007,
          batterymAh: 4.82
        },
        {
          ts: 10343,
          batterymAh: 4.82
        },
        {
          ts: 11517,
          batterymAh: 4.82
        },
        {
          ts: 12667,
          batterymAh: 4.82
        },
        {
          ts: 13836,
          batterymAh: 4.82
        },
        {
          ts: 14997,
          batterymAh: 4.82
        },
        {
          ts: 16149,
          batterymAh: 4.82
        },
        {
          ts: 17325,
          batterymAh: 4.82
        },
        {
          ts: 19143,
          batterymAh: 4.82
        }
      ],
      metadata: {
        applicationTotalBatteryCapacitymAh: 1000,
        batterymAhConsumedByAppPercent: 0
      }
    },
    'Disk IO': {
      metrics: [
        {
          ts: 5892,
          diskReadKb: 0,
          diskWriteKb: 90.112
        },
        {
          ts: 7237,
          diskReadKb: 0,
          diskWriteKb: 90.112
        },
        {
          ts: 8549,
          diskReadKb: 0,
          diskWriteKb: 90.112
        },
        {
          ts: 9748,
          diskReadKb: 0,
          diskWriteKb: 90.112
        },
        {
          ts: 10977,
          diskReadKb: 0,
          diskWriteKb: 90.112
        },
        {
          ts: 12168,
          diskReadKb: 0,
          diskWriteKb: 90.112
        },
        {
          ts: 13408,
          diskReadKb: 0,
          diskWriteKb: 90.112
        },
        {
          ts: 14650,
          diskReadKb: 0,
          diskWriteKb: 90.112
        },
        {
          ts: 15866,
          diskReadKb: 0,
          diskWriteKb: 90.112
        },
        {
          ts: 17050,
          diskReadKb: 0,
          diskWriteKb: 90.112
        },
        {
          ts: 18955,
          diskReadKb: 0,
          diskWriteKb: 90.112
        }
      ],
      metadata: {
        diskReadMb: {
          total: 0
        },
        diskWriteMb: {
          total: 0.991
        }
      }
    }
  },
  threshold: {
    appStartTotalTime: {
      operator: 'greaterThan',
      value: 3
    },
    fpsAvg: {
      operator: 'lessThan',
      value: 40
    },
    jankyFpsAvg: {
      operator: 'greaterThan',
      value: 50
    },
    frozenFrame: {
      operator: 'greaterThan',
      value: 0.1
    },
    anrCount: {
      operator: 'greaterThan',
      value: 1
    },
    cpuUsagePercentageAvg: {
      operator: 'greaterThan',
      value: 40
    },
    cpuUsagePercentageMax: {
      operator: 'greaterThan',
      value: 70
    },
    memoryUsageMbAvg: {
      operator: 'greaterThan',
      value: 250
    },
    memoryUsageMbMax: {
      operator: 'greaterThan',
      value: 400
    },
    diskReadMbTotal: {
      operator: 'greaterThan',
      value: 100
    },
    diskWriteMbTotal: {
      operator: 'greaterThan',
      value: 100
    },
    networkReadKbTotal: {
      operator: 'greaterThan',
      value: 10
    },
    networkWriteKbTotal: {
      operator: 'greaterThan',
      value: 20
    },
    totalBatteryConsumedPercent: {
      operator: 'greaterThan',
      value: 20
    }
  },
  startTime: '2023-02-18T05:53:27.000Z',
  endTime: '2023-02-18T05:53:47.000Z',
  device: {
    deviceId: 'emulator-5554',
    name: 'sdk_gphone64_x86_64',
    os: 'android',
    osVersion: '12'
  },
  package: {
    bundleId: 'org.wikipedia',
    name: 'Wikipedia',
    version: '2.7.50426-r-2022-12-08'
  },
  metadata: {
    video:
      '/Users/pankajkaushik/.csp/sessions/33a9c793-5383-44fa-9d0e-9acf6f2f0ff1/video.mp4',
    diagnostic:
      '/Users/ashu/.csp/sessions/1ec4c04e-9cde-4dfd-aef6-082e570f5502',
    logcat: {
      main: '/Users/pankajkaushik/.csp/sessions/33a9c793-5383-44fa-9d0e-9acf6f2f0ff1/logcat_main.txt',
      system:
        '/Users/pankajkaushik/.csp/sessions/33a9c793-5383-44fa-9d0e-9acf6f2f0ff1/logcat_system.txt',
      crash:
        '/Users/pankajkaushik/.csp/sessions/33a9c793-5383-44fa-9d0e-9acf6f2f0ff1/logcat_crash.txt',
      radio:
        '/Users/pankajkaushik/.csp/sessions/33a9c793-5383-44fa-9d0e-9acf6f2f0ff1/logcat_radio.txt',
      events:
        '/Users/pankajkaushik/.csp/sessions/33a9c793-5383-44fa-9d0e-9acf6f2f0ff1/logcat_events.txt'
    }
  },
  name: 'test'
};

const initialState = {
  sessionData: sessionDataJson
};

export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    updateSessionMetrics: (state, action) => {
      state.sessionData = action.payload;
    }
  }
});

export const getSessionMetrics = (state) => state.report.sessionData;

// Action creators are generated for each case reducer function
export const { updateSessionMetrics } = reportSlice.actions;

export default reportSlice.reducer;
