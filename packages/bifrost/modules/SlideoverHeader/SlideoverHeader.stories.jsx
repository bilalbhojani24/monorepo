import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import SlideoverHeader from './index';

const defaultConfig = {
  title: 'Application/Components/SlideoverHeader',
  component: SlideoverHeader,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={
            "import SlideoverHeader from '@browserstack/bifrost'"
          }
        />
      ),
    },
  },

  argTypes: {
    dismissButton: {
      option: { type: 'boolean' },
      defaultValue: true,
    },
    heading: {
      option: { type: 'string' },
      defaultValue: 'Slideover Heading',
    },
    isBorder: {
      option: { type: 'boolean' },
      defaultValue: true,
    },
    subHeading: {
      option: { type: 'string' },
      defaultValue: 'Slideover subheading Slideover subheading subheading ',
    },
    backgroundColorClass: {
      option: { type: 'string' },
      defaultValue: '',
    },
    lightText: {
      option: { type: 'boolean' },
      defaultValue: false,
    },
  },
  controls: {},
};
const Template = (args) => <SlideoverHeader {...args} />;

const Primary = Template.bind({});

Primary.parameters = {
  controls: {},
};

export default defaultConfig;
export { Primary };
