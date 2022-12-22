import React from 'react';
import RadioGroup from './index';
import DocPageTemplate from '../../.storybook/DocPageTemplate';
import { DIRECTIONS } from './const/radioGroupConstants';

const defaultConfig = {
  title: 'Application/Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    docs: {
      page: () => {
        return <DocPageTemplate importStatement={"import RadioGroup from 'bifrost/RadioGroup'"} />;
      }
    }
  },
  argTypes: {
    direction: {
      options: DIRECTIONS,
      control: { type: 'inline-radio' }
    },
    inlineDescription: {
      control: { type: 'boolean' }
    },
    rightAligned: {
      control: { type: 'boolean' }
    }
  },
  controls: {}
};
const Template = (args) => <RadioGroup {...args} />;
const Primary = Template.bind({});
Primary.parameters = {
  controls: {}
};

export default defaultConfig;
export { Primary };
