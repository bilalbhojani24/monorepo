import React from 'react';

import DocPageTemplate from '../../.storybook/DocPageTemplate';

import { DIRECTIONS } from './const/radioGroupConstants';
import RadioGroup from './index';

const defaultConfig = {
  title: 'Application/Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    docs: {
      page: () => (
        <DocPageTemplate
          importStatement={"import RadioGroup from 'bifrost/RadioGroup'"}
        />
      )
    }
  },
  argTypes: {
    direction: {
      options: DIRECTIONS,
      control: { type: 'inline-radio' },
      defaultValue: DIRECTIONS[0]
    },
    selectedOption: {
      option: { type: null },
      defaultValue: {
        id: 'radio-2',
        name: 'Radio 2 and it can grow longer and much more longer',
        description: 'It is the description of Radio 1',
        disabled: false
      }
    },
    inlineDescription: {
      control: { type: 'boolean' },
      defaultValue: false
    },
    rightAligned: {
      control: { type: 'boolean' },
      defaultValue: false
    },
    options: {
      option: { type: null },
      defaultValue: [
        {
          id: 'radio-1',
          name: 'Radio 1 and it can grow longer and much more longer',
          description: 'It is the description of Radio 1',
          disabled: false
        },
        {
          id: 'radio-2',
          name: 'Radio 2 and it can grow longer',
          description: 'It is the description of Radio 2',
          disabled: false
        },
        {
          id: 'radio-3',
          name: 'Radio 3 and it can grow longer',
          description: 'It is the description of Radio 3',
          disabled: false
        }
      ]
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
