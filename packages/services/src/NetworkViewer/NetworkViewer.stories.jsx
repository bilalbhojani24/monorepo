import React from 'react';
import { delay } from '@browserstack/utils';
import { within } from '@storybook/testing-library';

import NetworkViewer from '.';

const defaultConfig = {
  title: 'NetworkViewer',
  component: NetworkViewer,
  argTypes: {
    logsURL: {
      defaultValue: 'https://apimocha.com/o11y/logs-staging'
    }
  },
  controls: {}
};
const Template = (args) => (
  <div style={{ maxWidth: '720px' }}>
    <NetworkViewer {...args} />
  </div>
);
const Primary = Template.bind({});
Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await delay(10000);
};
Primary.parameters = {
  controls: {}
};
export default defaultConfig;
export { Primary };
