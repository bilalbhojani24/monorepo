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
      )
    }
  },

  argTypes: {
    dismissButton: {
      option: { type: 'boolean' },
      defaultValue: true
    },
    heading: {
      option: { type: 'string' },
      defaultValue:
        'Slideover Heading with long desc. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. '
    },
    isBorder: {
      option: { type: 'boolean' },
      defaultValue: true
    },
    subHeading: {
      option: { type: 'string' },
      defaultValue: 'Slideover subheading Slideover subheading subheading '
    },
    backgroundColorClass: {
      option: { type: 'string' },
      defaultValue: ''
    },
    lightText: {
      option: { type: 'boolean' },
      defaultValue: false
    },
    isEllipsisHeader: {
      option: { type: 'boolean' },
      defaultValue: true
    },
    headerTooltipProps: {
      option: { type: 'object' },
      defaultValue: { theme: 'dark' }
    }
  },
  controls: {}
};
const Template = (args) => <SlideoverHeader {...args} />;

const Primary = Template.bind({});

Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
