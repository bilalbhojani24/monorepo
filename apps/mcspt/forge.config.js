module.exports = {
  packagerConfig: {
    protocols: [
      {
        name: 'BrowserStack-AppPerformance',
        schemes: ['bsperf']
      }
    ],
    extraResource: ['./nodeBE']
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        icon: './cspWin.ico'
      }
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        icon: './cspMac.icns'
      },
      platforms: ['darwin']
    },
    {
      name: '@electron-forge/maker-deb',
      config: {}
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {}
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
