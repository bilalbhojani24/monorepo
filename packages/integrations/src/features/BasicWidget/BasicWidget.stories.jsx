import React from 'react';

// import DocPageTemplate from '../../../.storybook/DocPageTemplate';
import BasicWidget from '.';

const defaultConfig = {
  title: 'BasicWidget',
  component: BasicWidget,
  argTypes: {
    authUrl: {
      option: { type: 'string' },
      defaultValue:
        'https://local.bsstag.com/integrations-service/user-access-token'
    },
    isOpen: {
      option: { type: 'boolean ' },
      defaultValue: true
    }
  },
  controls: {}
};
const Template = (args) => <BasicWidget {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};
export default defaultConfig;
export { Primary };
