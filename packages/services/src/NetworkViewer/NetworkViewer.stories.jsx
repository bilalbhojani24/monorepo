import React from 'react';

import NetworkViewer from '.';

const defaultConfig = {
  title: 'NetworkViewer',
  component: NetworkViewer,
  argTypes: {
    logsURL: {
      defaultValue: 'https://apimocha.com/o11y/nlog'
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
Primary.parameters = {
  controls: {}
};
export default defaultConfig;
export { Primary };
