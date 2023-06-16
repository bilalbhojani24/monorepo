import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';
import Button from '../Button';

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
      option: { type: null },
      defaultValue: 'Need more bandwidth?'
    },
    description: {
      option: { type: null },
      defaultValue:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus praesentium tenetur pariatur.'
    },
    content: {
      option: { type: null },
      defaultValue: <Button colors="white">Contact sales</Button>
    },
    hasBorder: {
      option: { type: 'boolean' },
      defaultValue: false
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
