import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import ActionPanel from './index';

const defaultConfig = {
  title: 'Application/Components/ActionPanel',
  component: ActionPanel,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import ActionPanel from 'bifrost/ActionPanel'"}
        />
      )
    }
  },
  argTypes: {
    title: {
      option: { type: 'text' },
      defaultValue: 'Need more bandwidth?'
    },
    description: {
      option: { type: 'text' },
      defaultValue:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus praesentium tenetur pariatur.'
    },
    content: {
      option: { type: 'text' },
      defaultValue:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus praesentium tenetur pariatur.'
    }
  },
  controls: {}
};
const Template = (args) => <ActionPanel {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
