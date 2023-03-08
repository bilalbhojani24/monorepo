import React from 'react';

// import DocPageTemplate from '../../../.storybook/DocPageTemplate';
import CreateIssueWithProvider from '.';

const defaultConfig = {
  title: 'CreateIssue',
  component: CreateIssueWithProvider,
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
const Template = (args) => <CreateIssueWithProvider {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};
export default defaultConfig;
export { Primary };
