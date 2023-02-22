import React from 'react';

// import DocPageTemplate from '../../../.storybook/DocPageTemplate';
import CreateIssue from '.';

const defaultConfig = {
  title: 'CreateIssue',
  component: CreateIssue,
  argTypes: {
    authUrl: {
      option: { type: 'string' },
      defaultValue:
        'http://localhost:3000/integrations-service/user-access-token'
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
