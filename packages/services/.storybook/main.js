const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    ...(process.env.STORYBOOK_INTERACTION === 'true'
      ? ['@storybook/addon-interactions']
      : []),
    '@storybook/addon-a11y',
    'storybook-addon-designs'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  }
};
export default config;
