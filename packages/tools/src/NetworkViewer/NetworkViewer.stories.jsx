import React from 'react';

import NetworkViewer from '.';

const defaultConfig = {
  title: 'NetworkViewer',
  component: NetworkViewer,
  argTypes: {
    logsURL: {
      defaultValue:
        'https://raw.githubusercontent.com/saucelabs/network-viewer/main/examples/src/data/network.har'
    }
  },
  controls: {}
};
const Template = (args) => <NetworkViewer {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};
export default defaultConfig;
export { Primary };
