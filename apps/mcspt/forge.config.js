const APP_NAME = 'BrowserStack-AppPerformance';

module.exports = {
  packagerConfig: {
    protocols: [
      {
        name: APP_NAME,
        schemes: ['bsperf']
      }
    ],
    extraResource: ['./nodeBE'],
    icon: './cspLogo'
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        icon: './cspLogo.ico',
        name: APP_NAME
      },
      platforms: ['win32']
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        icon: './cspLogo.icns',
        name: APP_NAME
      },
      platforms: ['darwin']
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin']
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-webpack',
      config: {
        mainConfig: './webpack.main.config.js',
        renderer: {
          config: './webpack.renderer.config.js',
          entryPoints: [
            {
              html: './src/index.html',
              js: './src/renderer.js',
              name: 'main_window',
              preload: {
                js: './src/preload.js'
              }
            },
            {
              html: './src/splash.html',
              js: './src/splashScreen.js',
              name: 'splash'
            }
          ]
        },
        devContentSecurityPolicy:
          "default-src 'self' 'unsafe-eval' 'unsafe-inline' http://localhost:* ws://localhost:*; img-src https: http: data: blob: about:; connect-src https: http: ws:",
        port: 2099
      }
    }
  ]
};
