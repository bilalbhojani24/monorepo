module.exports = {
  packagerConfig: {
    protocols: [
      {
        name: 'Browserstack App Performance',
        schemes: ['bsperf']
      }
    ]
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {}
    },
    {
      name: '@electron-forge/maker-zip',
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
          "default-src 'self' 'unsafe-eval' 'unsafe-inline' http://localhost:* ws://localhost:*; img-src https: http: data: blob: about:;",
        port: 2099
      }
    }
  ]
};
