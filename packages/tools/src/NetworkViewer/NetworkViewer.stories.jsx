import React from 'react';

import NetworkViewer from '.';

const defaultConfig = {
  title: 'NetworkViewer',
  component: NetworkViewer,
  argTypes: {},
  controls: {}
};
const Template = (args) => <NetworkViewer {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};
export default defaultConfig;
export { Primary };
