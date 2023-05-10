import React from 'react';

import NetworkViewer from '.';

const defaultConfig = {
  title: 'Application/Components/NetworkViewer',
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
Primary.parameters = {
  controls: {}
};
export default defaultConfig;
export { Primary };
