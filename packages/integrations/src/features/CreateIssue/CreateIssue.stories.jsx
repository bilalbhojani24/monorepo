import React from 'react';

import { CreateIssue } from '.';

const defaultConfig = {
  title: 'CreateIssue',
  component: CreateIssue,
  argTypes: {
    authUrl: {
      option: { type: 'string' },
      defaultValue: 'https://integrations.bsstag.com/api/user-access-tokens'
    },
    isOpen: {
      option: { type: 'boolean' },
      defaultValue: true
    },
    projectId: {
      option: { type: 'string' },
      defaultValue: 'project_1'
    }
  },
  controls: {}
};
const Template = (args) => <CreateIssue {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};
export default defaultConfig;
export { Primary };
