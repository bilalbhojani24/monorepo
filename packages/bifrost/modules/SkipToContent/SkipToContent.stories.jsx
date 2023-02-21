import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import SkipToContent from './index';

const defaultConfig = {
  title: 'Application/Components/SkipToContent',
  component: SkipToContent,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import SkipToContent from 'bifrost/SkipToContent'"}
        />
      )
    }
  },
  argTypes: {
    wrapperClassName: {
      control: { type: 'text' },
      type: { summary: 'TEXT', required: false },
      description: 'Classes to be passed to base component'
    }
  },
  controls: {}
};
const Template = (args) => (
  <SkipToContent {...args}>Skip to main content</SkipToContent>
);
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
