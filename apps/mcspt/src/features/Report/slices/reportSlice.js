import { createSlice } from '@reduxjs/toolkit';

const sessionDataJson = {
  status: 'Session Stopped',
  aggregated: {
    appStartWaitTime: {
      value: 944
    },
    appStartTotalTime: {
      value: 941
    },
    appStartType: {
      value: 'cold'
    },
    memoryUsageMbMax: {
      value: 490.799
    },
    memoryUsageMbAvg: {
      value: 400.308
    },
    cpuUsagePercentageMax: {
      value: 19.98
    },
    cpuUsagePercentageAvg: {
      value: 5.897
    },
    cpuActiveThreadMax: {
      value: 131
    },
    cpuActiveThreadAvg: {
      value: 122.738
    },
    networkReadKbTotal: {
      value: 2590.053
    },
    networkWriteKbTotal: {
      value: 37883.396
    },
    totalBatteryConsumedPercent: {
      value: 1
    },
    fpsAvg: {
      value: 11.143
    },
    jankyFpsAvg: {
      value: 1.429
    },
    slowFramePercent: {
      value: 13.17
    },
    frozenFrame: {
      value: 0
    },
    anrCount: {
      value: 0
    },
    applicationTotalBatteryCapacitymAh: {
      value: 2716
    },
    batterymAhConsumedByAppPercent: {
      value: 0.04786450662739319
    },
    diskReadMbTotal: {
      value: 42.983
    },
    diskWriteMbTotal: {
      value: 16.99
    }
  },
  report: {
    'App Startup': {
      appStartWaitTime: 944,
      appStartTotalTime: 941,
      appStartType: 'cold'
    },
    'Screen Load': {
      metrics: [
        {
          ts: 2697,
          activityName:
            'com.application.zomato/com.application.zomato.tabbed.home.HomeActivity',
          renderTime: 867
        },
        {
          ts: 13701,
          activityName:
            'com.application.zomato/com.application.zomato.tabbed.home.HomeActivity',
          renderTime: 362
        },
        {
          ts: 16672,
          activityName:
            'com.application.zomato/com.application.zomato.newRestaurant.view.ResMenuCartActivity',
          renderTime: 374
        }
      ],
      metadata: {}
    },
    Memory: {
      metrics: [
        {
          ts: 2597,
          memoryMB: 206.628
        },
        {
          ts: 4243,
          memoryMB: 279.455
        },
        {
          ts: 5723,
          memoryMB: 307.85
        },
        {
          ts: 7548,
          memoryMB: 262.569
        },
        {
          ts: 9339,
          memoryMB: 260.759
        },
        {
          ts: 11180,
          memoryMB: 259.84
        },
        {
          ts: 12954,
          memoryMB: 263.015
        },
        {
          ts: 14557,
          memoryMB: 292.602
        },
        {
          ts: 15946,
          memoryMB: 289.3
        },
        {
          ts: 17314,
          memoryMB: 315.351
        },
        {
          ts: 18685,
          memoryMB: 346.609
        },
        {
          ts: 20403,
          memoryMB: 408.486
        },
        {
          ts: 21960,
          memoryMB: 417.299
        },
        {
          ts: 23443,
          memoryMB: 453.07
        },
        {
          ts: 24972,
          memoryMB: 478.924
        },
        {
          ts: 26508,
          memoryMB: 475.628
        },
        {
          ts: 27995,
          memoryMB: 475.524
        },
        {
          ts: 29509,
          memoryMB: 475.528
        },
        {
          ts: 31027,
          memoryMB: 477.471
        },
        {
          ts: 32550,
          memoryMB: 479.973
        },
        {
          ts: 34056,
          memoryMB: 490.799
        },
        {
          ts: 35571,
          memoryMB: 489.342
        },
        {
          ts: 37089,
          memoryMB: 487.388
        },
        {
          ts: 38610,
          memoryMB: 485.703
        },
        {
          ts: 40098,
          memoryMB: 485.636
        },
        {
          ts: 41635,
          memoryMB: 485.643
        },
        {
          ts: 43104,
          memoryMB: 486.128
        },
        {
          ts: 44590,
          memoryMB: 486.521
        },
        {
          ts: 46073,
          memoryMB: 485.879
        }
      ],
      metadata: {
        memoryUsageMb: {
          max: 490.799,
          avg: 400.308
        }
      }
    },
    CPU: {
      metrics: [
        {
          ts: 3723,
          cpuUsagePercentage: 19.98,
          cpuThreads: 112
        },
        {
          ts: 4693,
          cpuUsagePercentage: 14.07,
          cpuThreads: 115
        },
        {
          ts: 5664,
          cpuUsagePercentage: 6.93,
          cpuThreads: 116
        },
        {
          ts: 6699,
          cpuUsagePercentage: 9.49,
          cpuThreads: 110
        },
        {
          ts: 7719,
          cpuUsagePercentage: 0.35,
          cpuThreads: 110
        },
        {
          ts: 8747,
          cpuUsagePercentage: 8.01,
          cpuThreads: 110
        },
        {
          ts: 9792,
          cpuUsagePercentage: 1.81,
          cpuThreads: 110
        },
        {
          ts: 10792,
          cpuUsagePercentage: 6.62,
          cpuThreads: 110
        },
        {
          ts: 11797,
          cpuUsagePercentage: 9.21,
          cpuThreads: 111
        },
        {
          ts: 12908,
          cpuUsagePercentage: 4.43,
          cpuThreads: 113
        },
        {
          ts: 13919,
          cpuUsagePercentage: 8.49,
          cpuThreads: 118
        },
        {
          ts: 14910,
          cpuUsagePercentage: 2.07,
          cpuThreads: 118
        },
        {
          ts: 15951,
          cpuUsagePercentage: 1.45,
          cpuThreads: 118
        },
        {
          ts: 16936,
          cpuUsagePercentage: 6.96,
          cpuThreads: 120
        },
        {
          ts: 17888,
          cpuUsagePercentage: 5.54,
          cpuThreads: 119
        },
        {
          ts: 18994,
          cpuUsagePercentage: 11.54,
          cpuThreads: 126
        },
        {
          ts: 20031,
          cpuUsagePercentage: 19.1,
          cpuThreads: 131
        },
        {
          ts: 21109,
          cpuUsagePercentage: 8.86,
          cpuThreads: 129
        },
        {
          ts: 22213,
          cpuUsagePercentage: 1.37,
          cpuThreads: 129
        },
        {
          ts: 23249,
          cpuUsagePercentage: 7.66,
          cpuThreads: 128
        },
        {
          ts: 24289,
          cpuUsagePercentage: 8.35,
          cpuThreads: 128
        },
        {
          ts: 25302,
          cpuUsagePercentage: 3.18,
          cpuThreads: 128
        },
        {
          ts: 26338,
          cpuUsagePercentage: 3.53,
          cpuThreads: 128
        },
        {
          ts: 27353,
          cpuUsagePercentage: 4.1,
          cpuThreads: 128
        },
        {
          ts: 28374,
          cpuUsagePercentage: 1.97,
          cpuThreads: 128
        },
        {
          ts: 29374,
          cpuUsagePercentage: 2.48,
          cpuThreads: 128
        },
        {
          ts: 30406,
          cpuUsagePercentage: 4.3,
          cpuThreads: 128
        },
        {
          ts: 31414,
          cpuUsagePercentage: 4.78,
          cpuThreads: 128
        },
        {
          ts: 32493,
          cpuUsagePercentage: 4.18,
          cpuThreads: 127
        },
        {
          ts: 33538,
          cpuUsagePercentage: 8.41,
          cpuThreads: 127
        },
        {
          ts: 34638,
          cpuUsagePercentage: 10.6,
          cpuThreads: 127
        },
        {
          ts: 35714,
          cpuUsagePercentage: 2.66,
          cpuThreads: 127
        },
        {
          ts: 36743,
          cpuUsagePercentage: 7.05,
          cpuThreads: 127
        },
        {
          ts: 37769,
          cpuUsagePercentage: 4.43,
          cpuThreads: 127
        },
        {
          ts: 38787,
          cpuUsagePercentage: 0.36,
          cpuThreads: 127
        },
        {
          ts: 39819,
          cpuUsagePercentage: 4.03,
          cpuThreads: 127
        },
        {
          ts: 40852,
          cpuUsagePercentage: 3.99,
          cpuThreads: 127
        },
        {
          ts: 41870,
          cpuUsagePercentage: 0.48,
          cpuThreads: 127
        },
        {
          ts: 42913,
          cpuUsagePercentage: 3.93,
          cpuThreads: 127
        },
        {
          ts: 43938,
          cpuUsagePercentage: 6.57,
          cpuThreads: 127
        },
        {
          ts: 44972,
          cpuUsagePercentage: 2.05,
          cpuThreads: 127
        },
        {
          ts: 46020,
          cpuUsagePercentage: 2.3,
          cpuThreads: 127
        }
      ],
      metadata: {
        cpuUsagePercentage: {
          max: 19.98,
          avg: 5.897
        },
        cpuActiveThread: {
          max: 131,
          avg: 122.738
        }
      }
    },
    Network: {
      metrics: [
        {
          ts: 4634,
          networkReadKb: 74.304,
          networkWriteKb: 872.303
        },
        {
          ts: 5990,
          networkReadKb: 31.505,
          networkWriteKb: 634.455
        },
        {
          ts: 7344,
          networkReadKb: 13.364,
          networkWriteKb: 71.578
        },
        {
          ts: 8713,
          networkReadKb: 12.097,
          networkWriteKb: 18.994
        },
        {
          ts: 10068,
          networkReadKb: 7.587,
          networkWriteKb: 11.644
        },
        {
          ts: 11412,
          networkReadKb: 9.332,
          networkWriteKb: 13.809
        },
        {
          ts: 13000,
          networkReadKb: 11.059,
          networkWriteKb: 18.33
        },
        {
          ts: 14237,
          networkReadKb: 43.354,
          networkWriteKb: 2934.733
        },
        {
          ts: 15564,
          networkReadKb: 23.138,
          networkWriteKb: 2518.53
        },
        {
          ts: 16893,
          networkReadKb: 14.487,
          networkWriteKb: 617.788
        },
        {
          ts: 18106,
          networkReadKb: 35.255,
          networkWriteKb: 1721.804
        },
        {
          ts: 19484,
          networkReadKb: 85.698,
          networkWriteKb: 337.1
        },
        {
          ts: 20869,
          networkReadKb: 294.819,
          networkWriteKb: 1529.199
        },
        {
          ts: 22305,
          networkReadKb: 130.597,
          networkWriteKb: 3470.551
        },
        {
          ts: 23672,
          networkReadKb: 187.435,
          networkWriteKb: 4012.309
        },
        {
          ts: 25045,
          networkReadKb: 220.393,
          networkWriteKb: 2989.063
        },
        {
          ts: 26402,
          networkReadKb: 13.768,
          networkWriteKb: 621.482
        },
        {
          ts: 27779,
          networkReadKb: 13.028,
          networkWriteKb: 171.145
        },
        {
          ts: 29131,
          networkReadKb: 12.868,
          networkWriteKb: 149.202
        },
        {
          ts: 30498,
          networkReadKb: 9.524,
          networkWriteKb: 34.588
        },
        {
          ts: 31827,
          networkReadKb: 111.797,
          networkWriteKb: 3745.346
        },
        {
          ts: 33222,
          networkReadKb: 199.666,
          networkWriteKb: 1781.26
        },
        {
          ts: 34626,
          networkReadKb: 689.55,
          networkWriteKb: 3702.169
        },
        {
          ts: 36014,
          networkReadKb: 166.292,
          networkWriteKb: 1055.584
        },
        {
          ts: 37370,
          networkReadKb: 93.808,
          networkWriteKb: 1769.887
        },
        {
          ts: 38738,
          networkReadKb: 11.984,
          networkWriteKb: 46.394
        },
        {
          ts: 40109,
          networkReadKb: 13.272,
          networkWriteKb: 268.391
        },
        {
          ts: 41522,
          networkReadKb: 10.74,
          networkWriteKb: 113.925
        },
        {
          ts: 42930,
          networkReadKb: 13.836,
          networkWriteKb: 348.524
        },
        {
          ts: 44290,
          networkReadKb: 20.68,
          networkWriteKb: 2050.401
        },
        {
          ts: 45660,
          networkReadKb: 14.816,
          networkWriteKb: 252.908
        }
      ],
      metadata: {
        networkReadKb: {
          total: 2590.053
        },
        networkWriteKb: {
          total: 37883.396
        }
      }
    },
    Battery: {
      metrics: [
        {
          ts: 2663,
          batteryPercentage: 66
        },
        {
          ts: 3785,
          batteryPercentage: 66
        },
        {
          ts: 4871,
          batteryPercentage: 66
        },
        {
          ts: 5974,
          batteryPercentage: 66
        },
        {
          ts: 7058,
          batteryPercentage: 66
        },
        {
          ts: 8172,
          batteryPercentage: 66
        },
        {
          ts: 9299,
          batteryPercentage: 66
        },
        {
          ts: 10393,
          batteryPercentage: 66
        },
        {
          ts: 11508,
          batteryPercentage: 66
        },
        {
          ts: 12614,
          batteryPercentage: 66
        },
        {
          ts: 13750,
          batteryPercentage: 66
        },
        {
          ts: 14878,
          batteryPercentage: 66
        },
        {
          ts: 15998,
          batteryPercentage: 66
        },
        {
          ts: 17078,
          batteryPercentage: 66
        },
        {
          ts: 18137,
          batteryPercentage: 66
        },
        {
          ts: 19209,
          batteryPercentage: 66
        },
        {
          ts: 20309,
          batteryPercentage: 66
        },
        {
          ts: 21398,
          batteryPercentage: 66
        },
        {
          ts: 22529,
          batteryPercentage: 66
        },
        {
          ts: 23638,
          batteryPercentage: 66
        },
        {
          ts: 24741,
          batteryPercentage: 66
        },
        {
          ts: 25868,
          batteryPercentage: 66
        },
        {
          ts: 26990,
          batteryPercentage: 66
        },
        {
          ts: 28119,
          batteryPercentage: 66
        },
        {
          ts: 29206,
          batteryPercentage: 66
        },
        {
          ts: 30318,
          batteryPercentage: 66
        },
        {
          ts: 31420,
          batteryPercentage: 66
        },
        {
          ts: 32536,
          batteryPercentage: 66
        },
        {
          ts: 33640,
          batteryPercentage: 66
        },
        {
          ts: 34768,
          batteryPercentage: 66
        },
        {
          ts: 35882,
          batteryPercentage: 65
        },
        {
          ts: 36977,
          batteryPercentage: 65
        },
        {
          ts: 38072,
          batteryPercentage: 65
        },
        {
          ts: 39189,
          batteryPercentage: 65
        },
        {
          ts: 40305,
          batteryPercentage: 65
        },
        {
          ts: 41409,
          batteryPercentage: 65
        },
        {
          ts: 42510,
          batteryPercentage: 65
        },
        {
          ts: 43619,
          batteryPercentage: 65
        },
        {
          ts: 44720,
          batteryPercentage: 65
        },
        {
          ts: 45822,
          batteryPercentage: 65
        },
        {
          ts: 46922,
          batteryPercentage: 65
        }
      ],
      metadata: {
        totalBatteryConsumedPercent: 1
      }
    },
    Frames: {
      metrics: [
        {
          ts: 3982,
          fps: 45,
          jankyFps: 9
        },
        {
          ts: 5149,
          fps: 15,
          jankyFps: 4
        },
        {
          ts: 6261,
          fps: 0,
          jankyFps: 0
        },
        {
          ts: 7623,
          fps: 0,
          jankyFps: 0
        },
        {
          ts: 8793,
          fps: 0,
          jankyFps: 0
        },
        {
          ts: 10026,
          fps: 0,
          jankyFps: 0
        },
        {
          ts: 11255,
          fps: 0,
          jankyFps: 0
        },
        {
          ts: 12432,
          fps: 1,
          jankyFps: 1
        },
        {
          ts: 13741,
          fps: 4,
          jankyFps: 3
        },
        {
          ts: 14906,
          fps: 1,
          jankyFps: 0
        },
        {
          ts: 16105,
          fps: 0,
          jankyFps: 0
        },
        {
          ts: 17387,
          fps: 26,
          jankyFps: 3
        },
        {
          ts: 18722,
          fps: 32,
          jankyFps: 0
        },
        {
          ts: 20009,
          fps: 18,
          jankyFps: 6
        },
        {
          ts: 21213,
          fps: 25,
          jankyFps: 7
        },
        {
          ts: 22394,
          fps: 1,
          jankyFps: 1
        },
        {
          ts: 23583,
          fps: 25,
          jankyFps: 4
        },
        {
          ts: 25080,
          fps: 27,
          jankyFps: 2
        },
        {
          ts: 26552,
          fps: 0,
          jankyFps: 0
        },
        {
          ts: 27719,
          fps: 0,
          jankyFps: 0
        },
        {
          ts: 28885,
          fps: 0,
          jankyFps: 0
        },
        {
          ts: 30044,
          fps: 0,
          jankyFps: 0
        },
        {
          ts: 31210,
          fps: 26,
          jankyFps: 1
        },
        {
          ts: 32624,
          fps: 33,
          jankyFps: 2
        },
        {
          ts: 34170,
          fps: 52,
          jankyFps: 5
        },
        {
          ts: 35635,
          fps: 16,
          jankyFps: 0
        },
        {
          ts: 36812,
          fps: 20,
          jankyFps: 1
        },
        {
          ts: 37977,
          fps: 0,
          jankyFps: 0
        },
        {
          ts: 39176,
          fps: 0,
          jankyFps: 0
        },
        {
          ts: 40364,
          fps: 0,
          jankyFps: 0
        },
        {
          ts: 41720,
          fps: 0,
          jankyFps: 0
        },
        {
          ts: 43173,
          fps: 8,
          jankyFps: 0
        },
        {
          ts: 44352,
          fps: 15,
          jankyFps: 1
        },
        {
          ts: 45530,
          fps: 0,
          jankyFps: 0
        },
        {
          ts: 46708,
          fps: 0,
          jankyFps: 0
        }
      ],
      metadata: {
        fps: {
          avg: 11.143
        },
        jankyFps: {
          avg: 1.429
        },
        slowFramePercent: 13.17,
        frozenFrame: 0
      }
    },
    'App size': 20.89,
    ANR: 0,
    'Application Battery': {
      metrics: [
        {
          ts: 3167,
          batterymAh: 9.4
        },
        {
          ts: 4492,
          batterymAh: 9.51
        },
        {
          ts: 5658,
          batterymAh: 9.58
        },
        {
          ts: 6834,
          batterymAh: 9.63
        },
        {
          ts: 8048,
          batterymAh: 9.64
        },
        {
          ts: 9244,
          batterymAh: 9.65
        },
        {
          ts: 10437,
          batterymAh: 9.69
        },
        {
          ts: 11631,
          batterymAh: 9.73
        },
        {
          ts: 13144,
          batterymAh: 9.77
        },
        {
          ts: 14319,
          batterymAh: 9.81
        },
        {
          ts: 15513,
          batterymAh: 9.82
        },
        {
          ts: 16722,
          batterymAh: 9.85
        },
        {
          ts: 17869,
          batterymAh: 9.88
        },
        {
          ts: 19091,
          batterymAh: 9.96
        },
        {
          ts: 20335,
          batterymAh: 10.1
        },
        {
          ts: 21629,
          batterymAh: 10.1
        },
        {
          ts: 22824,
          batterymAh: 10.2
        },
        {
          ts: 24005,
          batterymAh: 10.2
        },
        {
          ts: 25196,
          batterymAh: 10.2
        },
        {
          ts: 26398,
          batterymAh: 10.3
        },
        {
          ts: 27601,
          batterymAh: 10.3
        },
        {
          ts: 28819,
          batterymAh: 10.3
        },
        {
          ts: 30010,
          batterymAh: 10.3
        },
        {
          ts: 31224,
          batterymAh: 10.3
        },
        {
          ts: 32437,
          batterymAh: 10.4
        },
        {
          ts: 33612,
          batterymAh: 10.4
        },
        {
          ts: 34822,
          batterymAh: 10.5
        },
        {
          ts: 36029,
          batterymAh: 10.6
        },
        {
          ts: 37224,
          batterymAh: 10.6
        },
        {
          ts: 38437,
          batterymAh: 10.6
        },
        {
          ts: 39644,
          batterymAh: 10.6
        },
        {
          ts: 40838,
          batterymAh: 10.6
        },
        {
          ts: 42010,
          batterymAh: 10.7
        },
        {
          ts: 43180,
          batterymAh: 10.7
        },
        {
          ts: 44373,
          batterymAh: 10.7
        },
        {
          ts: 45572,
          batterymAh: 10.7
        },
        {
          ts: 46800,
          batterymAh: 10.7
        }
      ],
      metadata: {
        applicationTotalBatteryCapacitymAh: 2716,
        batterymAhConsumedByAppPercent: 0.04786450662739319
      }
    },
    'Disk IO': {
      metrics: [
        {
          ts: 3038,
          diskReadKb: 42024.96,
          diskWriteKb: 7491.584
        },
        {
          ts: 4389,
          diskReadKb: 229.376,
          diskWriteKb: 757.76
        },
        {
          ts: 5621,
          diskReadKb: 368.64,
          diskWriteKb: 2310.144
        },
        {
          ts: 6930,
          diskReadKb: 0,
          diskWriteKb: 229.376
        },
        {
          ts: 8217,
          diskReadKb: 0,
          diskWriteKb: 65.536
        },
        {
          ts: 9518,
          diskReadKb: 0,
          diskWriteKb: 106.496
        },
        {
          ts: 10774,
          diskReadKb: 0,
          diskWriteKb: 12.288
        },
        {
          ts: 12029,
          diskReadKb: 0,
          diskWriteKb: 61.44
        },
        {
          ts: 13457,
          diskReadKb: 0,
          diskWriteKb: 540.672
        },
        {
          ts: 14660,
          diskReadKb: 0,
          diskWriteKb: 307.2
        },
        {
          ts: 15930,
          diskReadKb: 0,
          diskWriteKb: 307.2
        },
        {
          ts: 17150,
          diskReadKb: 8.192,
          diskWriteKb: 692.224
        },
        {
          ts: 18313,
          diskReadKb: 12.288,
          diskWriteKb: 90.112
        },
        {
          ts: 19611,
          diskReadKb: 20.48,
          diskWriteKb: 536.576
        },
        {
          ts: 20987,
          diskReadKb: 40.96,
          diskWriteKb: 462.848
        },
        {
          ts: 22287,
          diskReadKb: 8.192,
          diskWriteKb: 98.304
        },
        {
          ts: 23553,
          diskReadKb: 65.536,
          diskWriteKb: 172.032
        },
        {
          ts: 24831,
          diskReadKb: 4.096,
          diskWriteKb: 196.608
        },
        {
          ts: 26100,
          diskReadKb: 4.096,
          diskWriteKb: 196.608
        },
        {
          ts: 27370,
          diskReadKb: 4.096,
          diskWriteKb: 196.608
        },
        {
          ts: 28672,
          diskReadKb: 4.096,
          diskWriteKb: 196.608
        },
        {
          ts: 29935,
          diskReadKb: 4.096,
          diskWriteKb: 196.608
        },
        {
          ts: 31267,
          diskReadKb: 0,
          diskWriteKb: 90.112
        },
        {
          ts: 32638,
          diskReadKb: 0,
          diskWriteKb: 40.96
        },
        {
          ts: 33887,
          diskReadKb: 36.864,
          diskWriteKb: 389.12
        },
        {
          ts: 35148,
          diskReadKb: 143.36,
          diskWriteKb: 434.176
        },
        {
          ts: 36431,
          diskReadKb: 4.096,
          diskWriteKb: 147.456
        },
        {
          ts: 37749,
          diskReadKb: 0,
          diskWriteKb: 73.728
        },
        {
          ts: 39016,
          diskReadKb: 0,
          diskWriteKb: 73.728
        },
        {
          ts: 40291,
          diskReadKb: 0,
          diskWriteKb: 73.728
        },
        {
          ts: 41588,
          diskReadKb: 0,
          diskWriteKb: 73.728
        },
        {
          ts: 42876,
          diskReadKb: 0,
          diskWriteKb: 73.728
        },
        {
          ts: 44138,
          diskReadKb: 0,
          diskWriteKb: 73.728
        },
        {
          ts: 45435,
          diskReadKb: 0,
          diskWriteKb: 73.728
        },
        {
          ts: 46698,
          diskReadKb: 0,
          diskWriteKb: 73.728
        },
        {
          ts: 47999,
          diskReadKb: 0,
          diskWriteKb: 73.728
        }
      ],
      metadata: {
        diskReadMb: {
          total: 42.983
        },
        diskWriteMb: {
          total: 16.99
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
  }
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
