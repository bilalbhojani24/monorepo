import React from 'react';
import { delay } from '@browserstack/utils';

import NetworkViewer from '.';

const defaultConfig = {
  title: 'Services/NetworkViewer',
  component: NetworkViewer,
  argTypes: {
    logsURL: {
      defaultValue: 'https://apimocha.com/o11y/logs-staging'
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: ''
    }
  },
  controls: {}
};
const Template = (args) => (
  <div style={{ maxWidth: '720px' }}>
    <NetworkViewer {...args} logsURL="https://apimocha.com/o11y/logs-staging" />
  </div>
);
const Primary = Template.bind({});
Primary.play = async () => {
  await delay(10000);
};
Primary.parameters = {
  controls: {}
};
export default defaultConfig;
export { Primary };
