module.exports = {
  presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],

  env: {
    test: {
      plugins: ['@babel/plugin-transform-modules-commonjs', '@babel/plugin-transform-runtime'],
    },
    production: {
      plugins: [
        [
          'transform-react-remove-prop-types',
          {
            mode: 'remove',
            removeImport: true,
            ignoreFilenames: ['node_modules'],
          },
        ],
      ],
    },
  },
};
