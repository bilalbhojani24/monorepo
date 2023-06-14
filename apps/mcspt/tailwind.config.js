const globalConfigs = require('@browserstack/tailwind-config');
const tailwindSupportedScssNesting = require('@tailwindcss/nesting');

const IS_DEV = process.argv.includes('IS_DEV');

const mcsptTailwindConfig = {
  ...globalConfigs.globalTailwindConfig
};

mcsptTailwindConfig.content = [
  'src/**/*.{js,jsx}',
  '../../packages/mcp-shared/features/**/*.{js,jsx}',
  'node_modules/@browserstack/bifrost/dist/**/*.{js,jsx}'
];

if (IS_DEV) {
  mcsptTailwindConfig.safelist = [
    {
      pattern: /.*/
    }
  ];
}

mcsptTailwindConfig.plugins.push(tailwindSupportedScssNesting);

module.exports = mcsptTailwindConfig;
